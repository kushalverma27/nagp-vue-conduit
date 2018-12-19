<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
            <!-- <router-link
                  :to="{ name: 'article/:slug' }"
                  class="nav-link"
                  active-class="active"
                >
      
                 </router-link> -->
                            <ArticleList></ArticleList>
               
           



         
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <RwvTag v-for="(tag, index) in tags" :name="tag" :key="index">
              </RwvTag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ArticleList from "@/components/ArticleList";

export default {
  name: "home",
  components: {
    ArticleList
  }

};
</script>
