<template>
  <div id="app">
    <router-link to="/index">首页</router-link>
    <router-link to="/shouru">收入</router-link>
    <router-view></router-view>
    <!-- <Data /> -->
  </div>
</template>

<script>
// import Data from './components/Data.vue'

export default {
  name: 'App',
  // components: {
  //   Data
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
