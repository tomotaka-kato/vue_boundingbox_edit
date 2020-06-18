<template>
  <rect
    :x="x"
    :y="y"
    :width="width"
    :height="height"
    stroke="green"
    stroke-width="5"
    fill="none"

    @click="onMouseClick"
    @mousedown="mouseDownHandler"
    />
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BoundingBoxType from '@/types/BoundingBoxType'

@Component
export default class BoundingBox extends Vue{

  @Prop( ) private boundingBoxType! : BoundingBoxType;
  @Prop( ) private onClick?         : (boundingBox : BoundingBoxType                           ) => void;
  @Prop( ) private onMouseDown?     : (event       : MouseEvent, boundingBox : BoundingBoxType ) => void;

  private isSelected: boolean = false;

  mounted() {
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

  onMouseClick(event: Event) {
    event.stopPropagation();
    if(this.onClick) this.onClick(this.boundingBoxType);
  }

  mouseDownHandler(event: Event) {
    if(this.onMouseDown) this.onMouseDown(event, this.boundingBoxType);
  }

}
</script>


<style lang="scss" scoped>

</style>
