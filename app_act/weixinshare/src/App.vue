<template>
  <div id="app">
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
    <!--这里是会被缓存的组件-->
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide (){
      return {
        reload:this.reload
      }
  },
   data(){
    return{
      isRouterAlive:true
    }
  },
  methods: {
    reload (){
      this.isRouterAlive = false;
      this.$nextTick(function() {
          this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
  /* padding: 0 10%; */
  /* height: 100%; */
}

</style>
