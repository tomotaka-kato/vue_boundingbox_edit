<template>
  <div class="home">
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
