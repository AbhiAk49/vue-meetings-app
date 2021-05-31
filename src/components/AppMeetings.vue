<template>
    <div class="container">
        <h2>Meetings</h2>
        <hr class="my-0"/>
       <div class="my-1">
            <b-nav tabs>
                <b-nav-item exact exact-active-class="active" class=" text-muted" :to="{name:'filter-search'}">Filter/Search</b-nav-item>
                <b-nav-item exact exact-active-class="active" class=" text-muted" :to="{name:'add-meeting'}">Add Meeting</b-nav-item>
            </b-nav>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'AppMeetings',
}

</script>

<style scoped>

</style>