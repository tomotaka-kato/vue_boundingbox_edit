<template>
  <div class="draw-area">
    <svg v-for="boundingBox in boundingBoxes">
      <rect
        :x="boundingBox.sX"
        :y="boundingBox.sY"
        :width="boundingBox.eX - boundingBox.sX"
        :height="boundingBox.eY - boundingBox.sY"
        stroke="green"
        stroke-width="3"
        fill="none"
      />
    </svg>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BoundingBox from '@/types/BoundingBox'

@Component
export default class DrawArea extends Vue{

  private boundingBoxes: BoundingBox[] = [];


  mounted() {
    this.boundingBoxes.push(
      new BoundingBox(1, 1, 100, 50)
    )
  }

  get svgWidth() {
    const windowWidth = window.width;
    return 500;
  }

  get svgHeight() {
    return 300;
  }

}
</script>

<style lang="scss">
svg {
  border: 1px black solid;
  width: 90vw;
  height: 500px;
}
</style>
