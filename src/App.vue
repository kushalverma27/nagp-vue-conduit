<template>
  <div id="app">
     <Header />
    <!-- Welcome to Rock N Roll

    <BandsList> 
    <ul>
      <BandsList v-for="band in bands" :key="band.id" :band="band">
        {{band.name}}
      </BandsList>
    </ul>
    </BandsList> -->
      <router-view></router-view>
  </div>
</template>

<script>

import Header from "@/components/Header";

export default {
  name: 'app',
  components: {
Header
  }

}
</script>

<style>

</style>
