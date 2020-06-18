<template>
  <div class="draw-area">
    <svg
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
      @click="onClick"
      ref="svg"
    >
        <BoundingBox
          v-for="boundingBox in boundingBoxTypes"
          :key="boundingBox.id"
          :boundingBoxType="boundingBox"
          :onClick="onBoundingBoxClick"
          :onMouseDown="onBoundingBoxMouseDown"
        />
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

  private isCreatingBoundingBox: boolean = false;

  private currentBoundingBox: BoudingBoxType;

  private offsetX: number;
  private offsetY: number;
  private beginDrag: boolean = false;

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

  onBoundingBoxClick(boundingBox: BoundingBoxType) {
    this.currentBoundingBox = boundingBox;
  }

  onBoundingBoxMouseDown(event: MouseEvent, boundingBox: BoundingBoxType) {
    this.beginDrag = true;
    this.currentBoundingBox = boundingBox;
    const {x, y} = this.computeMousePosition(event);
    this.offsetX = x;
    this.offsetY = y;
  }

  // onBoundingBoxMove(event: MouseEvent) {
  //   if(!this.beginDrag) return;
  //   event.stopPropagation();
  //   const x = event.clientX;
  //   const y = event.clientY;
  //   // this.currentBoundingBox.updatePosition(x - offsetX, y - offsetY);
  //   console.log('move')
  // }

  // onBoundingBoxDragEnd(event: MouseEvent) {
  //   if(!this.beginDrag) return;
  //   event.stopPropagation();
  //   this.beginDrag = false;
  // }
  

  onClick(event: MouseEvent) {
    this.currentBoundingBox = null;
    this.boundingBoxTypes.map(x => x.isSelected = false);
  }

  onMouseDown(event: MouseEvent) {
    if(this.beginDrag) {

    } else {
      // バウンディングボックスが選択状態なら、バウンディングボックスの作成は行わない
      // if(this.boundingBoxTypes.filter(x => x.isSelected).length > 0) return;
      // if(this.currentBoundingBox) return ;

      this.isCreatingBoundingBox = true ;
      const { x, y } = this.computeMousePosition(event);
      this.currentBoundingBox = new BoundingBoxType(x, y, x, y);
      this.boundingBoxTypes.push(this.currentBoundingBox);
    }
  }

  onMouseMove(event: MouseEvent) {
    if(this.beginDrag) {
      const { x, y } = this.computeMousePosition(event);
      this.currentBoundingBox.updatePosition(x - this.offsetX, y - this.offsetY);
      this.offsetX = x;
      this.offsetY = y;
    } else if(this.isCreatingBoundingBox) {
      const { x, y } = this.computeMousePosition(event);
      this.currentBoundingBox.eX = x;
      this.currentBoundingBox.eY = y;
    }

  }

  onMouseUp(event: MouseEvent) {
    this.beginDrag = false;
    this.isCreatingBoundingBox = false;
  }

  onMouseLeave(event: MouseEnvent) {
    this.boundingBoxTypes.map(x => x.isSelected = false);
  }


  // svg上でのマウス座標の返却
  private computeMousePosition(event: MouseEvent): {x: number, y: number } {
    const rect = this.$refs.svg.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
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
