<template>
    <div class="container">
        <h2>Calendar</h2>
        <hr class="my-0">
        <DateSelector v-on:updateDate="onUpdateDate" class="my-1 mx-0 px-0 container"/> 
        <div v-if="status==='Loading'" class="my-1 container-fluid">
            <Alert :variant="'info'">
                <template v-slot:alert-heading>
                   Please Wait
                </template>
                <p>Fetching Your Meetings...</p>
            </Alert>
        </div>
        <div v-else-if="status==='Error'" class="my-1 container-fluid">
            <Alert :variant="'danger'">
                <template v-slot:alert-heading>
                   Error
                </template>
                <p>Something went wrong. Please try again later</p>
            </Alert>
        </div>
        <div v-else class="my-1 container-fluid">
            <div v-if="checkMeetings()" >
                     <Alert :variant="'info'">
                        <template v-slot:alert-heading>
                        No Meetings for the day
                    </template>
                    </Alert>
            </div>
            <div v-else>
                <div class="calendar">
                    <div class="calendar-hours">
                        <div class="calendar-hour" v-for="hour in 24" :key="hour">
                            <div class="calendar-time text-muted ">{{hour-1}}</div>
                            <div class="calendar-hour-box "></div>
                        </div>
                    </div>
                    <div class="calendar-meetings">
                        <div class="calendar-meeting" v-for="meeting in meetings" :style="[ getHeight( meeting.startTime.hours, meeting.startTime.minutes,meeting.endTime.hours, meeting.endTime.minutes ), getPosition(  meeting.startTime.hours, meeting.startTime.minutes ) ]" :key="meeting.id" >
                            <div class="meeting-name">{{meeting.name}}</div>
                            <div class="meeting-desc">{{meeting.description}}</div>
                        </div>
                    </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
const HEIGHT_HOUR_BOX = 50, MARGIN_HOUR_BOXES = 5;
import DateSelector from '@/components/utils/DateSelector';
//import { getEmail,getToken,getUName } from '@/services/auth';
import Alert from '@/components/utils/Alerts';
import {fetchCalendarMeetings} from '@/services/meetings';
/**
 * 2021-06-28-Meet @ this!
 * 
 */
export default {
    name: 'AppHome',
    components:{
        Alert,
        DateSelector
    },
    data(){
        return{
            dateSelected:String,
            status:'Loading',
            meetings:[],
            error:null,
            user:{
                name:String,
                email:String,
                token:String
            }
        }
    },
    computed:{  
        token(){
            //console.log(this.$store.state.auth.token);
            return this.$store.state.auth.token;
        }
    },
    methods:{
        fetch(){
                fetchCalendarMeetings(this.dateSelected,this.token)
                    .then(meetings=>{
                        this.status='Loaded';
                        this.meetings=meetings;
                    })
                    .catch( error => {
                    this.error = error;
                    this.status = 'Error';
                    this.$router.push({name:'login'});
                    });
        },
        onUpdateDate(updateDate){
            this.dateSelected = updateDate;
            this.fetch();
            this.checkMeetings();
        },
        checkMeetings(){
                if(this.meetings.length===0){
                    return true;
                }
                else{
                    return false
                }
        },
         getHeight(  startHour, startMinute,endHour, endMinute  ) {    
                        const totalMinutes = ( endHour - startHour ) * 60 + ( endMinute - startMinute );
                        return {
                            height: totalMinutes * HEIGHT_HOUR_BOX / 60 + ( endHour - startHour ) * MARGIN_HOUR_BOXES + 'px'
                        };
        },
        getPosition(  startHour, startMinute  ) {
            const minutesFromStartOfDay = startHour * 60 + startMinute;
            return {
                top: minutesFromStartOfDay * HEIGHT_HOUR_BOX / 60 + startHour * MARGIN_HOUR_BOXES + 'px',
                left: '50px',
                right: '10px'
            };
        }
        
    },
    created() {
                // this.user.name=getUName();
                // this.user.email=getEmail();
                // this.user.token=getToken();
    }
};
</script>

<style scoped>
            .text-muted{
                font-size: 0.8em;
                padding:0;
            }
            .calendar {
                position: relative;
            }

            .calendar-hour {
                margin-bottom: 5px;
                flex-wrap: nowrap;
                display: flex;
            }

            .calendar-time {
                flex: 0 0 40px;
            }

            .calendar-hour-box {
                flex-grow: 1;
                min-height: 50px;
                background-color: lightblue;
            }

            .calendar-meeting {
                position: absolute;
                background-color: lightgray;
            }
            .meeting-desc{
                padding:0.2em;
                font-size:0.8em;
            }
            .meeting-name{
                padding:0.2em;
                font-size:0.9em;
                font-weight: bold;
            }
</style>