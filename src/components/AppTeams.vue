<template>
    <div class="container">
        <h2>Teams</h2>
        <hr class="my-0">
        <div class="text-muted">
                View and edit team you are part of
        </div>
        <div v-if="status==='Loading'" class="my-1 container-fluid">
            <Alert :variant="'info'">
                <template v-slot:alert-heading>
                   Please Wait
                </template>
                <p>Fetching Your Teams...</p>
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
            <div v-if="checkTeams()" >
                    <Alert :variant="'info'">
                    <template v-slot:alert-heading>
                    You are not part of any teams
                    </template>
                </Alert>
            </div>
            <div v-else class="row justify-content-md-center">
                <div v-for="team in teams" :key="team._id" class="my-1 col-sm-6">
                    <TeamCard :team="team" :users="users" v-on:updateTeams="Reload"/>
                </div>
                <div class="my-1 col-sm-6">
                    <div class="card border-info team-form" @click="addTeamForm">
                        <div class="img-wrapper">
                            <i class="fas fa-plus img"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TeamCard from '@/components/utils/TeamCard';
import { getUsers,/*getToken,getEmail,getUName*/ } from '@/services/auth';
import Alert from '@/components/utils/Alerts';
import {fetchTeams} from '@/services/teams';
export default {
    name: 'AppTeams',
     components:{
        Alert,
        TeamCard
    },
    data(){
        return{
            status:'Loading',
            teams:[],
            error:null,
            user:{
                name:String,
                email:String,
                token:String
            },
            users:[]
        }
    },
    methods:{
        getTeams(){
                fetchTeams(this.token)
                    .then(teams=>{
                        this.status='Loaded';
                        this.teams=teams;
                        //console.log(this.teams);
                    })
                    .catch( error => {
                    this.error = error;
                    this.status = 'Error'
                    });
        },
        checkTeams(){
                if(this.teams.length===0){
                    return true;
                }
                else{
                    return false
                }
        },
        Reload(){
            this.status='Loading';
            this.getTeams();
        },
        addTeamForm(){
            console.log('Add');
            this.$router.push({ path:'/teams/add'});
        }
        
    },
    computed:{  
        token(){
            //console.log(this.$store.state.auth.token);
            return this.$store.state.auth.token;
        }
    },
    created() {
                //this.user.name=getUName();
                //this.user.email=getEmail();
                //this.user.token=getToken();
                getUsers(this.token)
                  .then(response=>{
                    //console.log('response',response);
                    this.users=response;
                    this.getTeams();
                  })
    }
}
</script>

<style scoped>
    .team-form{
        cursor: pointer;
    }
    .text-muted{
        font-size: 0.8em;
        padding:0;
    }
    .img-wrapper{
         display: flex;
         padding: 5em;
         flex-direction: column;
    }
    .img{
        width: 100%;
        align-self: center;
        font-size: 4em;
        text-align: center;
        justify-self: center;
    }
    .col{
        min-height: 360px;
    }
    .card:hover{
        box-shadow: 0px 0px 6px 0px gold;
    }
    .set-height{
        min-height: 420px;
    }
</style>