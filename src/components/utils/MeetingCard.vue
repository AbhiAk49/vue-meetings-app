<template>
<b-card border-variant="info">
    <div class="d-flex flex-column">
        <b-card-text><span class="title p-0">{{title}}</span><strong class="mx-1">{{duration}}</strong></b-card-text>
        <b-card-text>{{meeting.name}}</b-card-text>
        <button type="button" class="btn btn-danger btn-sm btn-width" @click="removeYourself">Excuse Yourself</button>
    </div>
    <hr>
    <div class="d-flex flex-column">
        <b-card-text class="font-weight-bold">Attendees:</b-card-text>
        <b-card-text>{{attendeesList.join(", ")}}</b-card-text>
    </div>
    <div class="d-flex justify-content-between my-1">
        <div>
            <b-form-input
                list="userlist"
                v-model="selectedUser"
                placeholder="Add an attendee..."
                required
            ></b-form-input>
            <datalist id="userlist">
                <option v-for="user in usersMail" :key="user">{{ user }}</option>
            </datalist>
        </div>
        <button type="button" class="btn btn-info btn-sm btn-width" @click="addMember" >Add</button>
    </div>
        
</b-card>
</template>

<script>
//displaying the meetings card
import {mapAttendees,setMinutes} from '@/services/helper';
import {addMemberbyMail,removeSelf} from '@/services/meetings';
//import {getToken} from '@/services/auth';
  export default {
    name:'MeetingCard',
    props:{
     meeting:Object,
     users:Array  
    },
    data(){
        return{
            selectedUser:'',
            attendeesList:[],
            title:'',
            duration:'',
            usersMail:'',
            userToken:''
        }
    },
    computed:{  
        token(){
            //console.log(this.$store.state.auth.token);
            return this.$store.state.auth.token;
        }
    },
    methods:{
        addMember(){    
                        addMemberbyMail(this.meeting._id,this.selectedUser,this.token)
                            .then( () => { this.$emit('updateResults') })
        },
        removeYourself(){
                        removeSelf(this.meeting._id,this.token)
                            .then( () => { this.$emit('updateResults') })
        }
    },
    created(){
        let meetingStartTime = `${this.meeting.startTime.hours}:${setMinutes(this.meeting.startTime.minutes)}`;
        let meetingEndTime = `${this.meeting.endTime.hours}:${setMinutes(this.meeting.endTime.minutes)}`;
        this.duration = `${meetingStartTime}-${meetingEndTime}`;
        let meetingStartDate = new Date(this.meeting.startDate);
        let meetingEndDate = new Date(this.meeting.endDate);
        let listAttendees = this.meeting.attendees;
        let listUsers = this.users;
        this.usersMail=(mapAttendees(listUsers));
        this.attendeesList= (mapAttendees(listAttendees));
        this.title = `
        ${meetingStartDate.getDate()} ${meetingStartDate.toLocaleString('default', { month: 'long' })} ${meetingStartDate.getFullYear()} - ${meetingEndDate.getDate()} ${meetingEndDate.toLocaleString('default', { month: 'long' })} ${meetingEndDate.getFullYear()}`; 
    }
  }
</script>

<style scoped>
.btn-width{
    width: 33%;
    max-width: 200px;
}
.title{
    font-weight: bold;
    font-size: 1.2em;
    padding: 0.7em;
}
</style>