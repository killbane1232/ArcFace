<template>
  <div id="app">
    <header>
      <div class="header">
        <div class="logo"> Arcam </div>
        <v-btn v-if="authenticated" v-on:click.native="$router.push('/strategies')" replace class="button">Strategies</v-btn>
        <v-btn v-if="authenticated" v-on:click.native="$router.push('/accounts')" disabled replace class="button">Accounts</v-btn>
        <div class="logout">
          <v-btn v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout <v-icon icon="mdi-logout"/></v-btn>
        </div>
      </div>
    </header>
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
    this.authenticated = this.$cookies.isKey("token");
    if (!this.authenticated) {
      this.$router.push('/login')
    }
  },
  methods: {
    setAuthenticated (value: boolean) {
      this.authenticated = value;
    },
    logout () {
      UserService.logout().then(()=>{
        this.authenticated = false;
      });
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}
.header {
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  flex: 0 0 50%;
  width: 100%;
  height: 100px;
  margin-left: 5px;
  margin-right: 5px;
  transition: box-shadow 0.3s;
  height: auto;
}
.logout {
  display: flex;
  flex-direction: row-reverse;
  width: 90%;
  margin-right: 10px;
}
.logo {
  font-family: "Roboto";
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  flex: 0 0 10%;
  font-size: 30px;
  margin-left: 5px;
  margin-right: 5px;
}
.button {
  height: 30px;
}
</style>
