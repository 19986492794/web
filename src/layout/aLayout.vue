<template>
  <div class="app-wrapper">
    <app-main class="mainContent" />
  </div>
</template>

<script>
    import { AppMain } from './components'
    export default {
      name: "aLayout",
      components:{
        AppMain
      }
    }
</script>

<style lang="scss" scoped>
  .app-wrapper {
      position: relative;
      height: 100%;
      width: 100%;
  }
</style>
