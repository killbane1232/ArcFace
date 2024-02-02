<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div id="nav">
      <v-btn v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</v-btn>
    </div>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script lang="ts">
import { UserService } from './api';

export default {
  name: 'App',
  data () {
    return {
      authenticated: false
    }
  },
  mounted () {
    if (!this.authenticated) {
      this.$router.push('/login')
    }
  },
  methods: {
    setAuthenticated (value: boolean) {
      this.authenticated = value;
    },
    logout () {
      this.authenticated = false;
      UserService.logout();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
