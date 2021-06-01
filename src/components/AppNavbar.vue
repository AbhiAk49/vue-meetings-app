<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand >My meetings</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <template v-if="isAuthenticated">
        <b-navbar-nav>
          <b-nav-item :to="links[0]"  >Calendar</b-nav-item>
          <b-nav-item :to="links[1]"  >Meetings</b-nav-item>
          <b-nav-item :to="links[2]"  >Teams</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto ">
          <b-nav-text >Hi {{email}}</b-nav-text>
          <b-nav-item @click="logout">Log Out</b-nav-item>
        </b-navbar-nav>
      </template>
      <div v-else>
          <b-navbar-nav>
            <b-nav-item :to="links[3]" >LogIn</b-nav-item>
            <b-nav-item :to="links[4]" >SignUp</b-nav-item>
          </b-navbar-nav>
      </div>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    name: 'AppNavbar',
    data() {
        return {
            links: [
                { name : 'home' },
                { name : 'filter-search' },
                { name : 'teams' },
                { name: 'login'},
                { name: 'signup'}
            ]
        };
    },
    computed: {
            email() {
                      return this.$store.state.auth.email;
                  },
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            }
    },
    methods: {
        logout() {
            this.$store.dispatch( 'logout' )
                .then( () => this.$router.push( { name: 'login' } ) );
        }
    }
}
</script>

<style scoped>
</style>