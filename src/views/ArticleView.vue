<template>
  <div  >
 
    <div class="banner">
       
     <h1>{{article.slug}}</h1>
    
    
      <img :src="article.author.image" style=" display: inline-block;
    vertical-align: middle;
    height: 32px;
    width: 32px;
    border-radius: 30px;"/>
 {{article.author.username}} &nbsp;&nbsp;&nbsp;
 <span v-if="isCurrentUser" class="mod-options"> 
   <button class="btn btn-outline-danger btn-sm" @click="deleteArticle()">
      <span>Delete Article</span>
    </button>
    <button class="btn btn-outline-danger btn-sm" @click="editArticle()">
      <span>Edit Article</span>
    </button>
 </span>
 <span class="date" style="    color: #bbb;
    font-size: 0.8rem;
    display: block;">{{ article.createdAt | date }}</span>


     </div>
     <div style="margin-left:30%;margin-right:30%">
         {{article.description}}
         <PostComment
             v-if="isLogged"
            :slug="slug"
            
          >
          </PostComment>
         
        <Comment
            v-for="(comment, index) in comments"
            :slug="slug"
            :comment="comment"
            :key="index"
          >
          </Comment>
         
          <p v-if="!isLogged">
            <router-link :to="{ name: 'login' }">Sign in</router-link>
            or
            <router-link :to="{ name: 'register' }">sign up</router-link>
            to add comments on this article.
          </p> 
     </div>
     
     <!-- <button v-on:click="fetchArticle()">Call</button>  -->

  </div>


</template>



<script>
 //import Article from "@/components/Article";
 import { mapGetters } from "vuex";
 import Comment from "@/components/Comment";
 import store from "@/store"
import PostComment from "@/components/PostComment";



export default {
  name: "ArticleView",
  components: {
Comment,PostComment

  },
  props: {
//    /  article: { type: Object, required: true },
slug:{
  type: String
}
  
  },
  computed: {
 ...mapGetters(["article","comments","isLogged","user"]),
 isCurrentUser() {
     // alert(this.article.author.username)
      if (this.user.username && this.article.author.username) {
       
        return this.article.author.username == this.user.username;
      }
      return false;
    }

  },
  
watch:{
    slug(){
this.fetchArticle();
    },

    
mounted(){
    this.fetchArticle();
   
}},
methods:{
deleteArticle(){
   // alert("aa");
     this.$store.dispatch("articleDelete", this.article.slug)
     .then(() => this.$router.push({ name: "home" }));
     
},
editArticle(){
  
    this.$router.push({ name: "write" });
}
},
// created: function(){

//         this.fetchArticle(),
//         this.fetchComments()

//       },
//   methods: {
//     fetchArticle() {
//       this.$store.dispatch("fetchArticle", "brrbr-n1gm8a")
//     },
//      fetchComments() {
//         this.$store.dispatch("fetchComments", "brrbr-n1gm8a");
//      },   
     beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("fetchArticle", to.params.slug),
      store.dispatch("fetchComments", to.params.slug)
    ]).then(() => {
      next();
    });
  
    
  }
};

</script>
