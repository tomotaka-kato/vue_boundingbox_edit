<template>
<g @click="a" @mousedown="b">
    <rect
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      stroke="green"
      stroke-width="5"
      fill-opacity="0"
      :style="styles"
      @click="onMouseClick"
      @mousedown="mouseDownHandler"
    />
    <g v-if="boundingBoxType.isSelected">
    <circle :cx="boundingBoxType.sX" :cy="boundingBoxType.sY" r="7" fill="green" stroke-width="5" stroke="green" cursor="nwse-resize" @mousedown="cornerDownHandler($event, 'leftTop')"></circle>
    <circle :cx="boundingBoxType.eX" :cy="boundingBoxType.sY" r="7" fill="green" stroke-width="5" stroke="green" cursor="nesw-resize" @mousedown="cornerDownHandler($event, 'rightTop')"></circle>
    <circle :cx="boundingBoxType.sX" :cy="boundingBoxType.eY" r="7" fill="green" stroke-width="5" stroke="green" cursor="nesw-resize" @mousedown="cornerDownHandler($event, 'leftBottom')"></circle>
    <circle :cx="boundingBoxType.eX" :cy="boundingBoxType.eY" r="7" fill="green" stroke-width="5" stroke="green" cursor="nwse-resize" @mousedown="cornerDownHandler($event, 'rightBottom')"></circle>
    </g>
</g>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BoundingBoxType from '@/types/BoundingBoxType';
import { BoundingBoxStatus } from '@/types/BoundingBoxStatus';
@Component
export default class BoundingBox extends Vue{
  @Prop( ) private boundingBoxType! : BoundingBoxType;
  @Prop( ) private onClick?         : (boundingBox : BoundingBoxType                           ) => void;
  @Prop( ) private onMouseDown?     : (event       : MouseEvent, boundingBox : BoundingBoxType ) => void;
  @Prop( ) private onCornerDown?    : (event       : MouseEvent, point : string ) => void;

  private get styles(): object {
    switch(this.boundingBoxType.isSelected) {
      case BoundingBoxStatus.NotSelected:
        return { 'cursor': 'pointer'}
      case BoundingBoxStatus.Selected:
        return { 'cursor': 'move' }
      default:
        return {}
    }
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
  onMouseClick(event: MouseEvent) {
    event.stopPropagation();
    if(this.onClick) this.onClick(this.boundingBoxType);
  }
  mouseDownHandler(event: MouseEvent) {
    event.stopPropagation();
    if(this.onMouseDown) this.onMouseDown(event, this.boundingBoxType);
  }
  cornerDownHandler(event: MouseEvent, point: string) {
    event.stopPropagation();
    if(this.onCornerDown) this.onCornerDown(event, point);
  }
  a(event: MouseEvent) {
    event.stopPropagation();
  }
    b(event: MouseEvent) {
    event.stopPropagation();
  }
}
</script>
<style lang="scss" scoped>
  .slected-boundingBox {
    cursor: move
  }
</style>
