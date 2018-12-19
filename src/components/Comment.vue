<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer" style="    border-top: 1px solid #e5e5e5;
    box-shadow: none !important;
    font-size: 0.8rem;
    font-weight: 300;">
      <a href="" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" style="display: inline-block;
    vertical-align: middle;
    height: 20px;
    width: 20px;
    border-radius: 30px;" />
      </a>
      <router-link
        class="comment-author"
        :to="{ name: 'profile', params: { username: comment.author.username } }"
      >
        {{ comment.author.username }}
      </router-link>
      <span class="date-posted">{{ comment.createdAt | date }}</span>
      <span v-if="isCurrentUser" class="mod-options">
          
       
        <button  @click="destroy(slug, comment.id)" style="float:right">
      <i class="ion-trash-a"><span>Delete </span></i>
    </button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";


export default {
  name: "Comment",
  props: {
    slug: { type: String, required: true },
    comment: { type: Object, required: true }
  },
  computed: {
    isCurrentUser() {
      
      if (this.comment.author.username) {
       
        return this.comment.author.username === this.user.username;
      }
      return false;
    },
    ...mapGetters(["user","isLogged"])
  },
  methods: {
    destroy(slug, commentId) {
      this.$store.dispatch("commentDestroy", { slug, commentId });
    }
  }
};
</script>
