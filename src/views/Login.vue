<template>
  <div style="margin-left: 30%;margin-right: 30%;">
     <h1 class="text-xs-center" >Sign in</h1>
      <a class="text-xs-center" href="#/register" style="display:block">
            Need an account?
          </a>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
             <form v-on:submit.prevent="onSubmit(email, password);">
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
              Sign in
            </button>
          </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

const LOGIN = "login";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null
    };

  },
  methods: {
    onSubmit(email, password) {
      this.$store
        .dispatch(LOGIN, { email, password })
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
