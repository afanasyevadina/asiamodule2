<template>
  <div class="home">
    <form action="#" method="post" @submit.prevent="signin" autocomplete="off">
      <div class="form-group">
        <label for="login">Login</label>
        <input type="text" v-model="user.login" id="login" />
        <small class="error" v-if="errors.login">{{ errors.login }}</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="user.password" id="password" />
        <small class="error" v-if="errors.password">{{
          errors.password
        }}</small>
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
      <div>
        Do not have an account yet? <router-link to="/signup">Sign up</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signuin",
  data() {
    return {
      user: {
        login: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    signin: function() {
      this.errors = []
      fetch('http://laravel/api/login', {
        method: 'POST',
        body: JSON.stringify(this.user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => {
        if(json.error) {
          this.user.password = ''
          this.errors = json.error.errors
        } else {
          this.$parent.user = json.data
          localStorage.setItem('apiUser', JSON.stringify(json.data))
          this.$router.push('/logging')
        }
      })
    }
  }
};
</script>
