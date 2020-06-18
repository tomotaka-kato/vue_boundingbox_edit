<template>
  <div class="draw-area">
    <svg @click="onClick">
      <BoundingBox v-for="boundingBox in boundingBoxTypes" :boundingBoxType="boundingBox" />
    </svg>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BoundingBoxType from '@/types/BoundingBoxType'
import BoundingBox from '@/components/BoundingBox'

@Component({
  components: {
    BoundingBox
  }
})
export default class DrawArea extends Vue{

  private boundingBoxTypes: BoundingBoxTypes[] = [];


  mounted() {
    this.boundingBoxTypes.push(
      new BoundingBoxType(1, 1, 100, 50)
    )
  }

  get svgWidth() {
    const windowWidth = window.width;
    return 500;
  }

  get svgHeight() {
    return 300;
  }

  onClick(){
    this.boundingBoxTypes.push(
      new BoundingBoxType(100, 200, 200, 100)
    )
  }

}
</script>

<style lang="scss" scoped>
svg {
  border: 1px black solid;
  width: 90vw;
  height: 500px;
}
</style>
