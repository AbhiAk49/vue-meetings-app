export const successHandler = response => response.data; //just takes response and returns its data

export const errorHandler = error => {    //just takes error and returns its msg
    console.log( error.message );
    throw error;
}

export const mapAttendees=(attendees)=> {   //takes an array of objects which MUST have email property and 
    let attendeesList = [];                 // returns the array of emails of initial array
    attendeesList = attendees.map(attendees=>{return attendees.email});
    return attendeesList;
}

export function setMinutes(minutes) {
    if(minutes<10){
        minutes=`0${minutes}`;
    }
    return minutes
    
}