<template>
  <div id="app">
    <AppNavbar />
    <div class="container my-2">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar';
export default {
  name: 'App',
  components: {
    AppNavbar
  }
}
</script>

<style>
*{
    font-family: Arial, Helvetica, sans-serif;
    box-sizing: border-box;
}
</style>
