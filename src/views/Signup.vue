<template>
  <div class="home">
    <form action="#" method="post" @submit.prevent="signup" autocomplete="off">
      <div class="form-group">
        <label for="full_name">Full name</label>
        <input type="text" v-model="user.full_name" id="full_name" />
        <small class="error" v-if="errors.full_name">{{
          errors.full_name
        }}</small>
      </div>
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
      <div class="form-group">
        <label for="password_confirmation">Confirm password</label>
        <input
          type="password"
          v-model="password_confirmation"
          id="password_confirmation"        
        />
        <small class="error" v-if="errors.password_confirmation">{{
          errors.password_confirmation
        }}</small>
      </div>
      <div>
        <button type="submit">Sign up</button>
      </div>
      <div>
        Already have an account? <router-link to="/signin">Sign in</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      user: {
        full_name: "",
        login: "",
        password: "",
      },
      password_confirmation: "",
      errors: [],
    };
  },
  methods: {
    signup: function() {
      this.errors = []
      if(this.user.password != this.password_confirmation) {
        this.errors.password_confirmation = 'Password do not match'
        return
      }
      fetch('http://laravel/api/register', {
        method: 'POST',
        body: JSON.stringify(this.user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => {
        if(json.error) {
          this.errors = json.error.errors
        } else {
          this.$router.push('/signin')
        }
      })
    }
  }
};
</script>
