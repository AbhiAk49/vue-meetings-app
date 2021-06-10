<template>
<div class="my-1">
    <div class="card text-white bg-info">
      <div class="card-header">Add meeting</div>
      <div class="card-body ">
        <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="meeting-name" label="Name for the meeting" label-for="name" >
              <b-form-input id="name" size="sm" placeholder="Enter name for the meeting" v-model="form.name" @blur="$v.form.name.$touch()" 
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
            <b-form-group id="meeting-description" label="Description" label-for="description" >
              <b-form-textarea id="description" size="sm" placeholder="What is the agenda for the meeting?" v-model="form.description" no-resize @blur="$v.form.description.$touch()" 
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
            <b-form-group id="meeting-datepicker" label="Date" label-for="meeting-date" >
                <b-form-datepicker id="meeting-date" v-model="form.date" locale="en" calendar-width="100%"
                @blur="$v.form.date.$touch()" 
                :class="{'is-invalid': shouldAppendErrorClass($v.form.date),
                        'is-valid': shouldAppendValidClass($v.form.date)
                }"></b-form-datepicker>
              <div v-if="$v.form.date.$error">
                  <div v-if="!$v.form.date.required" class="error-message">
                      <small>Date is required</small>
                  </div>
              </div>
            </b-form-group>
            <b-form-group id="meeting-startTime" label="Start Time (hh:mm)" label-for="startTime">
                <div class="d-flex justify-content-around" id="startTime">
                    <div class="time-container">
                        <b-form-input type="number" v-model="form.startTime.hours" id="startTime-hours"
                         @blur="$v.form.startTime.hours.$touch()" 
                        :class="{'is-invalid': shouldAppendErrorClass($v.form.startTime.hours),
                                  'is-valid': shouldAppendValidClass($v.form.startTime.hours)
                         }"></b-form-input>
                        <label label-for="startTime-hours">Hours</label>
                    </div>
                    <div class="time-container">
                        <b-form-input type="number" v-model="form.startTime.minutes" id="startTime-mins"
                         @blur="$v.form.startTime.minutes.$touch()" 
                        :class="{'is-invalid': shouldAppendErrorClass($v.form.startTime.minutes),
                                  'is-valid': shouldAppendValidClass($v.form.startTime.minutes)
                        }"></b-form-input>
                        <label label-for="startTime-mins" >Minutes</label>
                    </div>
                </div>
                <div v-if="$v.form.startTime.$error">
                  <div class="error-message">
                      <small>Invalid Time</small>
                  </div>
                </div>
            </b-form-group>
            <b-form-group id="meeting-endTime" label="End Time (hh:mm)" label-for="endTime">
                <div class="d-flex justify-content-around" id="endTime">
                    <div class="time-container">
                        <b-form-input type="number" v-model="form.endTime.hours" id="endTime-hours"
                         @blur="$v.form.endTime.hours.$touch()" 
                        :class="{'is-invalid': shouldAppendErrorClass($v.form.endTime.hours),
                                  'is-valid': shouldAppendValidClass($v.form.endTime.hours)
                        }"></b-form-input>
                        <label label-for="endTime-hours">Hours</label>
                    </div>
                    <div class="time-container">
                        <b-form-input type="number" v-model="form.endTime.minutes" id="endTime-mins"
                         @blur="$v.form.endTime.minutes.$touch()" 
                        :class="{'is-invalid': shouldAppendErrorClass($v.form.endTime.minutes),
                                  'is-valid': shouldAppendValidClass($v.form.endTime.minutes)
                        }"></b-form-input>
                        <label label-for="endTime-mins" >Minutes</label>
                    </div>
                </div>
                <div v-if="$v.form.endTime.$error">
                  <div class="error-message">
                          <small>Invalid Time</small>
                      </div>
                </div>
            </b-form-group>
            <b-form-group id="meeting-attendees" label="Add/Remove attendees" label-for="attendees" >
              <b-form-input list="userlist" v-model="attendee" class="mx-1" placeholder="Search for attendees..."
              @blur="$v.form.attendees.$touch()" 
              :class="{'is-invalid': shouldAppendErrorClass($v.form.attendees),
                      'is-valid': shouldAppendValidClass($v.form.attendees)
              }"></b-form-input>
            <datalist id="userlist">
              <option v-for="user in users" :key="user._id">{{ user.email }}</option>
            </datalist>
            <div class="d-flex justify-content-around my-1">
              <b-button variant="primary" @click="addAttendee" size="sm">Add</b-button>
              <b-button variant="danger" @click="removeAttendee" size="sm">Remove</b-button>
            </div>
            <div v-if="$v.form.attendees.$error">
              <div class="error-message">
                  <small>Must have atleast one attendee</small>
              </div>
            </div>
            <div v-if="form.attendees.length!==0">
                <ul class="list-group" v-for="formAttendee in form.attendees" :key="formAttendee.email">
                  <li class="list-group-item list-group-item-secondary">{{formAttendee.email}}</li>
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
import { /*getUName,getEmail,getToken,*/getUsers } from '@/services/auth';
import {mapAttendees/*,setMinutes*/} from '@/services/helper';
import { required, minLength,maxLength,between } from 'vuelidate/lib/validators';
import {addMeeting} from '@/services/meetings';
import vue from 'vue';
export default {
    name: 'AppAddMeeting',
    data() {
      return {
        form: {
          name:'',
          description:'',
          date: '',
          startTime:{
              hours:'',
              minutes:''
          },
          endTime:{
              hours:'',
              minutes:''
          },
         attendees: []
        },
        attendee:'',
        show: true,
        user:{
            name:String,
            email:String,
            token:String
        },
        users:[],
        userMails:[],
        attendeeType:''
      }
    },       
    validations: {
            form: {
                name:{required,minLength:minLength(5),maxLength:maxLength(50)},
                description:{required,minLength:minLength(5),maxLength:maxLength(250)},
                date: {required},
                startTime:{
                    hours:{between:between(0,24),required},
                    minutes:{between:between(0,60),required}
                },
                endTime:{
                    hours:{between:between(0,24),required},
                    minutes:{between:between(0,60),required}
                },
              attendees: {minLength:minLength(1),required}
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
            //console.log("submitted");
            this.addCurrentUser();
            //console.log(this.form);
            addMeeting(this.form,this.token)
              .then(() => {
                this.$router.push({name:'home'});
                vue.$toast.success('Meeting was added successfully !',{position:'bottom-left'});
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
        this.form.startTime.hours = '';
        this.form.startTime.minutes= '';
        this.form.endTime.hours = '';
        this.form.endTime.minutes= '';
        this.form.date = '';
        this.form.attendees = [];
        this.attendee='';
        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
        this.show = true
        })
      },
      addAttendee(){
        if(mapAttendees(this.users).includes(this.attendee)){
          if(mapAttendees(this.form.attendees).includes(this.attendee)){
              this.attendeeType='Already added';
            }
            else{
            this.attendeeType='Added';
            this.form.attendees.push({email:this.attendee});
            }
        }
        else{
          this.attendeeType='NotExist';
        }
        if(this.attendeeType === 'NotExist'){
          vue.$toast.error('No such user exist!',{position:'bottom-right',timeout:2000});
        }
        if(this.attendeeType === 'Added'){
          vue.$toast.success('Attendee added!',{position:'bottom-right',timeout:2000});
        }
        if(this.attendeeType === 'Already added'){
          vue.$toast.warning('Attendee already added!',{position:'bottom-right',timeout:2000});
        }
        this.attendee='';
        this.attendeeType === '';
      },
      removeAttendee(){
        let targetIdx = null;
        for(let i=0;i<this.form.attendees.length;i++){
          if(this.attendee===this.form.attendees[i].email)
            targetIdx=i;
        }
        if(targetIdx!==null){
          this.form.attendees.splice(targetIdx,1);
        }
      },
      addCurrentUser(){
        //let currentEmail = JSON.parse(this.userEmail);
        //console.log(currentEmail);
        this.form.attendees.push({email:this.userEmail});
      }
    },
    created() {
                //this.user.token = getToken();
               // this.user.email = getEmail();
                getUsers(this.token)
                  .then(response=>{
                    this.users=response;
                  })
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
  .time-container{
      flex-basis: 25%;
  }
  .error-message{
    color: #ff040485;
}
</style>