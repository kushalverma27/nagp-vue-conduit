<template>
  <div class="article-preview">

    <router-link :to="articleLink" class="preview-link">
      <h1 v-text="article.title" />
      <p v-text="article.description" />
      <span>Read more...</span>
  

    </router-link>
  </div>
</template>


<script>



export default {
  name: "Article",
  components: {
   
  },
  props: {
    article: { type: Object, required: true },
     slug: {
      type: String,
      required: true
    }
  },
  
  computed: {
    
  
    articleLink() {
      return {
        name: "article",
        params: {
          slug: this.article.slug
        }
      };
    }
  }
};
</script>
