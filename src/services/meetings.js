import axios from 'axios';
import config from '@/config';
import { successHandler, errorHandler } from './helper';

//API CALLS RELATED TO MEETINGS
export const fetchCalendarMeetings = (date,token) => {
    return axios.get( `${config.apiBaseUrl}calendar?date=${date}`,
    { 
        headers: { 'Authorization': `${token}` }

    }
     )
    .then( successHandler )
    .catch( errorHandler )
}

export const OnSearchMeeting=(period,keywords,token)=>{
    const searchParameters={
        period:period
    };
    if(keywords){
        searchParameters.search=keywords;
    }
    return axios.get(
        `${config.apiBaseUrl}meetings/search`,
        {   
            headers: { 'Authorization': `${token}` },
            params: searchParameters,
        }
        
    )
}

export const addMemberbyMail = (meetingID,email,token) => {
    return axios.patch( `${config.apiBaseUrl}meetings/${meetingID}?action=add_attendee&userEmail=${email}`,null,
    { 
        headers: { 'Authorization': `${token}` }
    }
     )
    .then( successHandler )
    .catch( errorHandler )
}

export const removeSelf = (meetingID,token) => {
    return axios.patch( `${config.apiBaseUrl}meetings/${meetingID}?action=leave_meeting`,null,
    { 
        headers: { 'Authorization': `${token}` }
    }
     )
    .then( successHandler )
    .catch( errorHandler )
}

export const addMeeting = ( meeting,token ) => {
    return axios.post(
                `${config.apiBaseUrl}meetings`,
                meeting,
                {
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then( successHandler )
                .catch( errorHandler )
};