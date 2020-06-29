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
          :onCornerDown="onBoundingBoxCornerMouseDown"
        />
    </svg>
    <br>
    <Button text="削除" :onClick="onDeleteButton" />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BoundingBox from '@/components/BoundingBox.vue';
import Button from '@/components/Button.vue';
import BoundingBoxType from '@/types/BoundingBoxType';
import { BoundingBoxStatus } from '@/types/BoundingBoxStatus';

@Component({
  components: {
    BoundingBox,
    Button,
  }
})
export default class DrawArea extends Vue{

  private boundingBoxTypes: BoundingBoxType[] = [];

  private isCreatingBoundingBox: boolean = false;

  private currentBoundingBox: BoundingBoxType | null = null;

  private offsetX   : number = 0;
  private offsetY   : number = 0;
  private beginDrag : boolean = false;

  // 円
  private beginScale = false;
  private point ="";


  mounted() {
    this.boundingBoxTypes.push(
      new BoundingBoxType(1, 1, 100, 50)
    )
  }

  onBoundingBoxClick(boundingBox: BoundingBoxType) {
    this.currentBoundingBox = boundingBox;
  }

  onBoundingBoxMouseDown(event: MouseEvent, boundingBox: BoundingBoxType) {
    this.boundingBoxTypes.forEach(x => x.isSelected = BoundingBoxStatus.NotSelected);
    this.beginDrag = true;
    this.currentBoundingBox = boundingBox;
    this.currentBoundingBox.isSelected = BoundingBoxStatus.Selected;
    const {x, y} = this.computeMousePosition(event);
    this.offsetX = x;
    this.offsetY = y;
  }

  onBoundingBoxCornerMouseDown(event: MouseEvent, point: string) {
    this.beginScale = true;
    this.point = point;
  }
  

  /**
    * バウンディングボックス以外をクリックしたら選択状態を解除する。
    */
  onClick() {
    this.currentBoundingBox = null;
    this.boundingBoxTypes.forEach(x => x.isSelected = BoundingBoxStatus.NotSelected);
  }

  onMouseDown(event: MouseEvent) {
    if(!this.beginDrag) {
      // バウンディングボックスが選択状態なら、バウンディングボックスの作成は行わない

      this.isCreatingBoundingBox = true ;
      const { x, y } = this.computeMousePosition(event);
      this.currentBoundingBox = new BoundingBoxType(x, y, x, y);
      this.boundingBoxTypes.push(this.currentBoundingBox);
    }
  }

  onMouseMove(event: MouseEvent) {
    if(!this.currentBoundingBox) return;

    if(this.beginDrag) {
      const { x, y } = this.computeMousePosition(event);
      this.currentBoundingBox.updatePosition(x - this.offsetX, y - this.offsetY);
      this.offsetX = x;
      this.offsetY = y;
    } else if(this.isCreatingBoundingBox) {
      const { x, y } = this.computeMousePosition(event);
      this.currentBoundingBox.eX = x;
      this.currentBoundingBox.eY = y;
    } else if (this.beginScale) {
      const { x, y } = this.computeMousePosition(event);
      switch(this.point) {
        case "leftTop": 
          this.currentBoundingBox.sX = x;
          this.currentBoundingBox.sY = y;
          break;
        case "rightBottom":
          this.currentBoundingBox.eX = x;
          this.currentBoundingBox.eY = y;
          break;
        case "rightTop": 
          this.currentBoundingBox.eX = x;
          this.currentBoundingBox.sY = y;
          break;
        case "leftBottom":
          this.currentBoundingBox.sX = x;
          this.currentBoundingBox.eY = y;
          break;
      }
    }

  }

  onMouseUp() {
    this.beginDrag = false;
    this.isCreatingBoundingBox = false;
    this.beginScale = false;
    this.point = "";
  }

  onMouseLeave() {
    this.beginDrag = false;
    this.isCreatingBoundingBox = false;
    this.beginScale = false;
    this.point = "";
    // this.boundingBoxTypes.map(x => x.isSelected = BoundingBoxStatus.NotSelected);
  }

  // 削除ボタン押下（選択されているバウンディングボックスの削除）
  onDeleteButton() {
    this.boundingBoxTypes = this.boundingBoxTypes.filter(x => !x.isSelected)
  }

  // svg上でのマウス座標の返却
  private computeMousePosition(event: MouseEvent): {x: number, y: number } {
    const svg = this.$refs.svg as SVGElement;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return {x, y};
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


