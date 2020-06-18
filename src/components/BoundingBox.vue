<template>
  <rect
    :x="x"
    :y="y"
    :width="width"
    :height="height"
    stroke="green"
    stroke-width="3"
    fill="none"
    />
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BoundingBoxType from '@/types/BoundingBoxType'

@Component
export default class BoundingBox extends Vue{

  @Prop() private boundingBoxType!: BoundingBoxType;

  mounted() {
    console.log('test')
  }

  private get x() {
    return this.boundingBoxType.sX < this.boundingBoxType.eX
      ? this.boundingBoxType.sX
      : this.boundingBoxType.eX
  }

  private get y() {
    return this.boundingBoxType.sY < this.boundingBoxType.eY
      ? this.boundingBoxType.sY
      : this.boundingBoxType.eY
  }

  private get width() {
    return Math.abs(this.boundingBoxType.eX - this.boundingBoxType.sX);
  }
  private get height() {
    return Math.abs(this.boundingBoxType.eY - this.boundingBoxType.sY);
  }
}
</script>


<style lang="scss" scoped>

</style>
