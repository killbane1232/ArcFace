<template>
  <v-form ref="loginForm" class="auth">
    <h1>Login</h1>
    <v-text-field
      v-model="username"
      class="auth__input"
      label="Логин"
      hide-details="auto"
      variant="outlined"
      :append-icon="'mdi-account'"
    />
    <v-text-field
      v-model="password"
      class="auth__input"
      label="Пароль"
      hide-details="auto"
      :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="() => (value = !value)"
      :type="value ? 'password' : 'text'"
      variant="outlined"
    />
    <v-btn @click="login()"> Login </v-btn>
  </v-form>
</template>

<script lang="ts">
import {UserService} from '@/api'
import { getSHA256Hash }  from 'boring-webcrypto-sha256';
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      value: true
    }
  },
  methods: {
    async login () {
      if (this.username !== '' && this.password !== '') {
          getSHA256Hash(this.username + this.password).then((x)=>{
            UserService.login({login: this.username, hash: x}).then(res=>{
            if (res.error === null && res.message === 'success') {
              this.$emit('authenticated', true);
              this.$router.push('/strategies');
            } else {
              console.log('The username and / or password is incorrect')
            }
          })
        })
      } else {
        console.log('A username and password must be present')
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.auth {
  max-width: 700px;
  padding: 20px;
  margin: 10px auto;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  &__input {
    margin-bottom: 20px;
  }
}
</style>
