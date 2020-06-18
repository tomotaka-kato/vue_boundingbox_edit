<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <DrawArea />
  </div>
</template>

<script>
// @ is an alias to /src
import DrawArea from '@/components/DrawArea'

export default {
  name: 'Home',
  components: {
    DrawArea
  }
}
</script>

<style lang="scss">
  .home {
    
  }
</style>
