import axios from 'axios';
import config from '@/config';
import { successHandler, errorHandler } from './helper';

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
        `${config.apiBaseUrl}meetings`,
        {   
            headers: { 'Authorization': `${token}` },
            params: searchParameters
        }
    )
}

export const addMemberbyMail = (meetingID,email,token) => {
    return axios.patch( `${config.apiBaseUrl}meetings/${meetingID}?action=add_attendee&email=${email}`,null,
    { 
        headers: { 'Authorization': `${token}` }
    }
     )
    .then( successHandler )
    .catch( errorHandler )
}

export const removeSelf = (meetingID,token) => {
    return axios.patch( `${config.apiBaseUrl}meetings/${meetingID}?action=remove_attendee`,null,
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