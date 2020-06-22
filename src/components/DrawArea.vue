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
import BoundingBox from '@/components/BoundingBox.vue';
import BoundingBoxType from '@/types/BoundingBoxType';
import { BoundingBoxStatus } from '@/types/BoundingBoxStatus';

@Component({
  components: {
    BoundingBox
  }
})
export default class DrawArea extends Vue{

  private boundingBoxTypes: BoundingBoxType[] = [];

  private isCreatingBoundingBox: boolean = false;

  private currentBoundingBox: BoundingBoxType = null;

  private offsetX: number = 0;
  private offsetY: number = 0;
  private beginDrag: boolean = false;

  mounted() {
    this.boundingBoxTypes.push(
      new BoundingBoxType(1, 1, 100, 50)
    )
  }

  get svgWidth() {
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
    this.currentBoundingBox.isSelected = BoundingBoxStatus.Selected;
    const {x, y} = this.computeMousePosition(event);
    this.offsetX = x;
    this.offsetY = y;
  }
  

  /**
    * バウンディングボックス以外をクリックしたら選択状態を解除する。
    */
  onClick(event: MouseEvent) {
    this.currentBoundingBox = null;
    this.boundingBoxTypes.map(x => x.isSelected = BoundingBoxStatus.NotSelected);
  }

  onMouseDown(event: MouseEvent) {
    if(this.beginDrag) {

    } else {
      // バウンディングボックスが選択状態なら、バウンディングボックスの作成は行わない

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

  onMouseLeave(event: MouseEvent) {
    this.beginDrag = false;
    this.isCreatingBoundingBox = false;
    // this.boundingBoxTypes.map(x => x.isSelected = BoundingBoxStatus.NotSelected);
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
