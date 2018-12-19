<template>
  <div style="margin-left: 30%;margin-right: 30%;">
     <h1 class="text-xs-center" >Sign up</h1>
      <a class="text-xs-center" href="#/login" style="display:block">
            Have an account?
          </a>
             <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
             <form v-on:submit.prevent="onSubmit(email, password, username);">
                <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="username"
                placeholder="Username"
              />
                </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
                
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
  </div>
</template>

<script>
import { mapState } from "vuex";


export default {
  name: "Register",
  data() {
    return {
      username: null,
      email: null,
      password: null
    };
  },
  methods: {
    onSubmit(email, password, username) {
      this.$store
        .dispatch("register", { email, password, username })
        .then(() => this.$router.push({ name: "home" }));
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>
