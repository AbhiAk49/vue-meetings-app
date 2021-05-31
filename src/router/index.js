import Router from 'vue-router';
import AppLogin from '@/components/AppLogin';
import AppSignup from '@/components/AppSignup';
import AppHome from '@/components/AppHome';
import AppMeetings from '@/components/AppMeetings';
import AppTeams from '@/components/AppTeams';
import PageNotFound from '@/components/PageNotFound';
import AppAddMeeting from '@/components/AppAddMeeting';
import AppAddTeam from '@/components/AppAddTeam';
import AppFilterSearchMeeting from '@/components/AppFilterSearchMeeting';

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'login',
            path: '/login',
            component: AppLogin
        },
        {
            name: 'signup',
            path: '/signup',
            component: AppSignup
        },
        {
            name: 'home',
            path: '/',
            component: AppHome
        },
        {
            name: 'meetings',
            path: '/meetings',
            component: AppMeetings,
            children:[
                {
                    name:'add-meeting',
                    path:'add',
                    component:AppAddMeeting
                },
                {
                    name:'filter-search',
                    path:'',
                    component:AppFilterSearchMeeting
                }
            ]
        },
        {
            name: 'teams',
            path: '/teams',
            component: AppTeams,
        },
        {
            name:'add-team',
            path:'/teams/add',
            component:AppAddTeam
        },
        {
            name: 'page-not-found',
            path: '*',
            component: PageNotFound
        }
    ]
});

export default router;