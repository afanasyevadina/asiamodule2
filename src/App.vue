<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="mr-25">Home</router-link>
      <template v-if="user">
        <router-link to="/logging" class="mr-25">Logging and analytics</router-link>
        <router-link to="/logout">Logout ({{ user.full_name }})</router-link>
      </template>
      <template v-else>
        <router-link to="/signin">Sign in</router-link>
        <span>/</span>
        <router-link to="/signup">Sign up</router-link>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('apiUser'))
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.mr-25 {
  margin-right: 25px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.error {
  color: darkred;
}
</style>
