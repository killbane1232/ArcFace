<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div id="nav">
      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
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
    setAuthenticated () {
      this.authenticated = this.$cookies.isKey('user-token')
    },
    logout () {
      this.authenticated = false
      this.$cookies.remove('user-token')
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
