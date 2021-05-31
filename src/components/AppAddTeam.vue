<template>
<div class="my-1">
    <div class="card text-white bg-info">
      <div class="close-btn" @click="closeForm"><i class="far fa-times-circle img-fluid"></i></div>
      <div class="card-header">Add Team</div>
      <div class="card-body ">
        <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="team-name" label="Name for the team" label-for="name" >
              <b-form-input id="name" size="sm" placeholder="Enter name for the team" v-model="form.name" @blur="$v.form.name.$touch()" 
              :class="{'is-invalid': shouldAppendErrorClass($v.form.name),
                        'is-valid': shouldAppendValidClass($v.form.name)
              }"></b-form-input>
              <div v-if="$v.form.name.$error">
                <div v-if="!$v.form.name.required" class="error-message">
                    <small>Name is required</small>
                </div>
                <div v-if="!$v.form.name.minLength" class="error-message">
                    <small>Name must be atleast 5 characters</small>
                </div>
                <div v-if="!$v.form.name.maxLength" class="error-message">
                    <small>Name cannot exceed 50 characters</small>
                </div>
              </div>
            </b-form-group>
            <b-form-group id="team-short-name" label="Short for the team" label-for="short-name" >
              <b-form-input id="short-name" size="sm" placeholder="Enter unique - short for the team" v-model="form.shortName" @blur="$v.form.shortName.$touch()" 
              :class="{'is-invalid': shouldAppendErrorClass($v.form.shortName),
                        'is-valid': shouldAppendValidClass($v.form.shortName)
              }"></b-form-input>
              <div v-if="$v.form.shortName.$error">
                <div v-if="!$v.form.shortName.required" class="error-message">
                    <small>Short is required</small>
                </div>
                <div v-if="!$v.form.shortName.maxLength" class="error-message">
                    <small>Short cannot exceed 50 characters</small>
                </div>
              </div>
            </b-form-group>
            <b-form-group id="team-description" label="Description" label-for="description" >
              <b-form-textarea id="description" size="sm" placeholder="Describe your team" v-model="form.description" no-resize @blur="$v.form.description.$touch()" 
              :class="{'is-invalid': shouldAppendErrorClass($v.form.description),
                        'is-valid': shouldAppendValidClass($v.form.description)
              }"></b-form-textarea>
                <div v-if="$v.form.description.$error">
                  <div v-if="!$v.form.description.required" class="error-message">
                      <small>Description is required</small>
                  </div>
                  <div v-if="!$v.form.description.minLength" class="error-message">
                      <small>Description must be atleast 5 characters</small>
                  </div>
                  <div v-if="!$v.form.description.maxLength" class="error-message">
                      <small>Description cannot exceed 250 characters</small>
                  </div>
                </div>
            </b-form-group>
            <b-form-group id="team-members" label="Add/Remove Members" label-for="attendees" >
              <b-form-input list="userlist" v-model="member" class="mx-1" placeholder="Search for members..."
              @blur="$v.form.members.$touch()" 
              :class="{'is-invalid': shouldAppendErrorClass($v.form.members),
                      'is-valid': shouldAppendValidClass($v.form.members)
              }"></b-form-input>
            <datalist id="userlist">
              <option v-for="user in users" :key="user._id">{{ user.email }}</option>
            </datalist>
            <div class="d-flex justify-content-around my-1">
              <b-button variant="primary" @click="addMember" size="sm">Add</b-button>
              <b-button variant="danger" @click="removeMember" size="sm">Remove</b-button>
            </div>
            <div v-if="$v.form.members.$error">
              <div class="error-message">
                  <small>Must have atleast one member</small>
              </div>
            </div>
            <div v-if="form.members.length!==0">
                <ul class="list-group" v-for="formMember in form.members" :key="formMember.email">
                  <li class="list-group-item list-group-item-secondary">{{formMember.email}}</li>
                </ul>
            </div>
            </b-form-group>
            <div class="d-flex justify-content-between">
              <div  class="pd-2"> <b-button pill type="submit" variant="primary" size="sm">Finish</b-button></div>
              <div  class="pd-2"> <b-button pill type="reset" variant="danger" size="sm">Reset</b-button></div>
            </div>
        </b-form>
      </div>
    </div>
</div>
</template>

<script>
import { /*,,getUName*/getUsers } from '@/services/auth';
import {mapAttendees/*,setMinutes*/} from '@/services/helper';
import { required, minLength,maxLength} from 'vuelidate/lib/validators';
import {addTeam} from '@/services/teams';
import vue from 'vue';
export default {
    name: 'AppAddTeam',
    data() {
      return {
        form: {
          name:'',
          shortName:'',
          description:'',
          members: []
        },
        member:'',
        show: true,
        user:{
            name:String,
            email:String,
            token:String
        },
        users:[],
        userMails:[],
        memberType:''
      }
    },       
    validations: {
            form: {
                name:{required,minLength:minLength(5),maxLength:maxLength(50)},
                shortName:{required,maxLength:maxLength(20)},
                description:{required,minLength:minLength(5),maxLength:maxLength(250)},
                members: {minLength:minLength(1),required}
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
       shouldAppendErrorClass( field ) {
          return field.$error; 
      },
      shouldAppendValidClass( field ) {
          return !field.$invalid && field.$model && field.$dirty;
      },
      onSubmit() {
         this.$v.form.$touch();
         if( !this.$v.form.$invalid ){
            console.log("submitted");
            this.addCurrentUser();
            console.log(this.form);
            addTeam(this.form,this.token)
              .then(() => {
                this.$router.push({name:'teams'});
                vue.$toast.success('Team was added successfully !',{position:'bottom-left'});
              })
              .catch(error => {
                vue.$toast.error(
                               `${error.response.data.message}`,
                            {
                                timeout:5000,
                                position:'bottom-left'
                            });
              })
         }else{
           vue.$toast.error('Please fill the details correctly and try again',{position:'bottom-left'});
         }
      },
      onReset(event) {
        this.$v.form.$reset();
        event.preventDefault();
        // Reset our form values
        this.form.name = '';
        this.form.description = '';
        this.form.shortName='';
        this.form.members = '';
        this.attendee='';
        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
        this.show = true
        })
      },
      addMember(){
        if(mapAttendees(this.users).includes(this.member)){
            if(mapAttendees(this.form.members).includes(this.member)){
              this.memberType='Already added';
            }
            else{
            this.memberType='Added';
            this.form.members.push({email:this.member});
            }
        }
        else{
          this.memberType='NotExist';
        }
        if(this.memberType === 'NotExist'){
          vue.$toast.error('No such user exist!',{position:'bottom-right',timeout:2000});
        }
        if(this.memberType === 'Added'){
          vue.$toast.success('Member added!',{position:'bottom-right',timeout:2000});
        }
        if(this.memberType === 'Already added'){
          vue.$toast.warning('Member already added!',{position:'bottom-right',timeout:2000});
        }
        this.member='';
        this.memberType === '';
      },
      removeMember(){
        let targetIdx = null;
        for(let i=0;i<this.form.members.length;i++){
          if(this.attendee===this.form.members[i].email)
            targetIdx=i;
        }
        if(targetIdx!==null){
          this.form.attendees.splice(targetIdx,1);
        }
      },
      addCurrentUser(){
        //let currentEmail = JSON.parse(this.userEmail);
        //console.log(currentEmail);
        this.form.members.push({email:this.userEmail});
      },
      closeForm(){
        this.$router.push({name:'teams'});
      }
    },
    created() {
                //this.user.token = getToken();
                //this.user.email = getEmail();
                getUsers(this.token)
                  .then(response=>{
                    this.users=response;
                  })
  }
}
</script>

<style scoped>
  .card{
    position: relative;
  }
  .card-body{
    color: black;
  }
  .card-header{
    font-size: 2em;
    text-align: center;
  }
  .time-container{
      flex-basis: 25%;
  }
  .error-message{
    color: #ff040485;
  }
  .close-btn{
    color: black;
    position: absolute;
    right: 1%;
    top: 1%;
    font-size: 2em;
    cursor: pointer;
    z-index: 1;
  }
</style>