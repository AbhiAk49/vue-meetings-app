export const successHandler = response => response.data;

export const errorHandler = error => {
    console.log( error.message );
    throw error;
}

export const mapAttendees=(attendees)=> {
    let attendeesList = [];
    attendeesList = attendees.map(attendees=>{return attendees.email});
    return attendeesList;
}

export function setMinutes(minutes) {
    if(minutes<10){
        minutes=`0${minutes}`;
    }
    return minutes
    
}