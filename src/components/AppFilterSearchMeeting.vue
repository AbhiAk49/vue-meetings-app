<template>
  <div class="my-1">
    <div class="card text-white bg-info">
      <div class="card-header">Search for meetings</div>
      <div class="card-body ">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="DATE:" label-for="input-1" >
              <b-form-select
                id="input-1"
                v-model="form.date"
                :options="period"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group id="input-group-2" label="Search for:" label-for="input-2" >
              <b-form-textarea id="input-2" size="sm" placeholder="Search using words that describe your meeting" v-model="form.keywords" no-resize></b-form-textarea>
            </b-form-group>
            <div class="d-flex justify-content-between">
              <div  class="pd-2"> <b-button pill type="submit" variant="primary" size="sm">Search</b-button></div>
              <div  class="pd-2"> <b-button pill type="reset" variant="danger" size="sm">Reset</b-button></div>
            </div> 
        </b-form>
      </div>
    </div>
    <div v-if="status=='Loaded'" class="container my-1">
      <div v-if="meetings.length===0">
        <Alert :variant="'danger'">
                <template v-slot:alert-heading>
                  No such meeting was found
                </template>
                <p>Try searching for other meetings</p>
        </Alert>
      </div>
      <div v-else class="container my-1">
        <h2 class="my-2">Meetings matching criteria</h2>
        <hr>
        <div v-for="meeting in meetings" :key="meeting._id" class="my-1">
           <MeetingCard :meeting="meeting" :users="users"
           v-on:updateResults="Refresh"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/utils/Alerts';
import MeetingCard from '@/components/utils/MeetingCard';
import {OnSearchMeeting} from '@/services/meetings';
import { getUsers/*,getToken,getUName,getEmail*/ } from '@/services/auth';
import vue from 'vue';
  export default {
    name: 'AppAddMeeting',
    components:{Alert,MeetingCard},
    data() {
      return {
        form: {
          date: 'all',
          keywords:''
        },
        period: [{ text: 'ALL', value: 'all'},{ text: 'PAST', value: 'past' }, { text: 'TODAY', value: 'present'},{ text: 'UPCOMING', value: 'future'}],
        show: true,
        status:'Loading',
        meetings:[],
        error:null,
        user:{
            name:String,
            email:String,
            token:String
        },
        users:[]
      }
    },
    computed:{  
      token(){
          //console.log(this.$store.state.auth.token);
          return this.$store.state.auth.token;
      },
      userEmail(){
          //console.log(this.$store.state.auth.token);
          return this.$store.state.auth.email;
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        this.fetchResult();
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.date = 'all';
        this.form.keywords='';
        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        })
      },
      fetchResult(){
        this.status='Loading';
        OnSearchMeeting(this.form.date,this.form.keywords,this.token)
                    .then(response=>{
                        this.status='Loaded';
                        this.meetings=response.data;
                        this.showResultsToast();
                    })
                    .catch( error => {
                    this.error = error;
                    this.status = 'Error'
                    });
      },
      showResultsToast(){
                if(this.meetings.length===0){
                  vue.$toast.error('No meetings found',{position:'bottom-right'});
                }
                else if(this.meetings.length===1){
                  vue.$toast.success(`A meeting was found`,{position:'bottom-right'});
                }
                else{
                  vue.$toast.success(`${this.meetings.length} meetings were found`,{position:'bottom-right'});
                }     
      },
      Refresh(){
        this.fetchResult();
      }
    },
    created() {
                //this.user.name=getUName();
                //this.user.email=getEmail();
                //this.user.token=getToken();
                getUsers(this.token)
                  .then(response=>{
                    //console.log('response',response);
                    this.users=response;
                  })
                  //console.log('users',this.users);
    }
  }
</script>


<style scoped>
  .card-body{
    color: black;
  }
  .card-header{
    font-size: 2em;
    text-align: center;
  }
</style>