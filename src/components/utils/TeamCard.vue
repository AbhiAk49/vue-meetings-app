<template>
<b-card border-variant="info">
    <div class="d-flex flex-column">
        <b-card-text><span class="title p-0">{{team.name}}</span></b-card-text>
        <b-card-text class="font-weight-bolder">@{{team.shortName}}</b-card-text>
        <b-card-text class="text-muted">{{team.description}}</b-card-text>
        <button type="button" class="btn btn-danger btn-sm btn-width" @click="removeYourself" v-on:click="$emit('updateTeams')">Excuse Yourself</button>
    </div>
    <hr>
    <div class="d-flex flex-column">
        <b-card-text class="font-weight-bold">Members:</b-card-text>
        <b-card-text v-if="showLess===true" @click="toggleMembersView">{{teamMembers[0]}}, {{teamMembers[1]}}...</b-card-text>
        <b-card-text v-else @click="toggleMembersView">{{teamMembers.join(", ")}}</b-card-text>
    </div>
    <div class="d-flex justify-content-between my-1">
        <div>
            <b-form-input
                list="userlist"
                v-model="selectedUser"
                placeholder="Add a Member..."
                required
            ></b-form-input>
            <datalist id="userlist">
                <option v-for="user in usersMail" :key="user">{{ user }}</option>
            </datalist>
        </div>
        <button type="button" class="btn btn-info btn-sm btn-width" @click="addTeamMember" v-on:click="$emit('updateTeams')">Add</button>
    </div>
        
</b-card>
</template>

<script>
//displaying team card
import {mapAttendees} from '@/services/helper';
import {leaveTeam,addTeamMemberbyMail} from '@/services/teams';
import {getToken} from '@/services/auth';
  export default {
    name:'TeamCard',
    props:{
     team:Object,
     users:Array  
    },
    data(){
        return{
            selectedUser:'',
            listMembers:[],
            usersMail:'',
            userToken:'',
            teamMembers:[],
            showLess:true
        }
    },
    methods:{
        addTeamMember(){    
                        addTeamMemberbyMail(this.team._id,this.selectedUser,this.userToken);
        },
        removeYourself(){
                        leaveTeam(this.team._id,this.userToken);
        },
        toggleMembersView(){
                    this.showLess=!(this.showLess);
                    //console.log(this.showLess);
        }
    },
    created(){
        this.userToken=getToken();
        let listMembers = this.team.members;
        let listUsers = this.users;
        this.usersMail=(mapAttendees(listUsers));
        this.teamMembers= (mapAttendees(listMembers));
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