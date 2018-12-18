<template>
    <header>
        <nav class="navbar navbar-light">
            <div class = "header-container">
                 <a class="navbar-brand"  href="#/">
          conduit
        </a>
            <ul v-if="isLogged" class="nav navbar-nav pull-xs-right">
              <li class="nav-item">
        <a class="nav-link"  href="#/">
          Home
        </a>
      </li>   
      <li class="nav-item">
        <a class="nav-link"  href="#/write">
          New Article
        </a>
      </li>
       <li class="nav-item">
        <a class="nav-link"  href="#/home">
           {{user.username}}
        </a>
      
      </li>
       <li class="nav-item">
        <!-- <a class="nav-link" href=url()  v-l>
           logout
        </a> -->
        <a class="nav-link" @click.prevent="url()" >logout</a>
      </li>

            </ul>

  <ul v-else class="nav navbar-nav pull-xs-right">

      <li class="nav-item">
        <a class="nav-link"  href="#/">
          Home
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link"  href="#/login">
          Sign in
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link"  href="#/register">
          Sign up
        </a>

    </li></ul>
<br><br>
            </div>
            
        </nav>
    </header>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  props:{
    user:{type : String}
    },
  computed: {
    ...mapGetters(["user", "isLogged"])
  },
  
  methods: {
    url() {
         this.$store.dispatch("logout")
         .then(() => this.$router.push({ name: "home" }));
    }
}


};
</script>