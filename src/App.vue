<script setup lang="ts">
import MyHeader from './components/MyHeader.vue';
</script>

<template>
  <my-header />
  <router-view class="router-view" />
</template>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
  font-weight: 500;
  color: black;
}

.router-view {
  max-width: 1400px;
  margin: 0 auto;
  padding-inline: 20px;
}
</style>
