import axios from 'axios';
import config from '@/config';
import { successHandler, errorHandler } from './helper';

//API CALLS RELATED TO TEAMS
export const fetchTeams = (token) => {
    return axios.get( `${config.apiBaseUrl}teams`,
    { 
        headers: { 'Authorization': `${token}` }
    }
     )
    .then( successHandler )
    .catch( errorHandler )
}

export const addTeamMemberbyMail = (teamID,email,token) => {
    return axios.patch( `${config.apiBaseUrl}teams/${teamID}?action=add_member&email=${email}`,null,
    { 
        headers: { 'Authorization': `${token}` }
    }
     )
    .then( successHandler )
    .catch( errorHandler )
}

export const leaveTeam = (teamID,token) => {
    return axios.patch( `${config.apiBaseUrl}teams/${teamID}?action=remove_member`,null,
    { 
        headers: { 'Authorization': `${token}` }
    }
     )
    .then( successHandler )
    .catch( errorHandler )
}

export const addTeam = ( team,token ) => {
    return axios.post(
                `${config.apiBaseUrl}teams`,
                team,
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