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
import store from '@/store';

const meta = {
    authorize: []
};
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
            component: AppHome,
            meta
        },
        {
            name: 'meetings',
            path: '/meetings',
            component: AppMeetings,
            meta,
            children:[
                {
                    name:'add-meeting',
                    path:'add',
                    component:AppAddMeeting,
                    meta
                },
                {
                    name:'filter-search',
                    path:'',
                    component:AppFilterSearchMeeting,
                    meta
                }
            ]
        },
        {
            name: 'teams',
            path: '/teams',
            component: AppTeams,
            meta
        },
        {
            name:'add-team',
            path:'/teams/add',
            component:AppAddTeam,
            meta
        },
        {
            name: 'page-not-found',
            path: '*',
            component: PageNotFound
        }
    ]
});


// Global auth guard
router.beforeEach(( to, from, next ) => {
    // Right now, role-based authorization is NOT supported
    if( to.meta.authorize && !store.getters.isAuthenticated ) {
        next({
            name: 'login'
        });
    } else {
        next();
    }
});

export default router;