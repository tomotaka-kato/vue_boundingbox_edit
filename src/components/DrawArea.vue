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
    <Button text = 'ボタン1' :onClick='onButton1Click' color='#FF05AA' />
    <Button :text = 'button2Text'  />

    <br />
      <input type="text" v-model="todoMessage">
      <Button text = '保存' :onClick='save'  />
      <Button text = '削除' :onClick='deleteCompletedItems'  />

        <div v-for="(item, index) in todoItems" :key="index">
          <input type="checkbox" v-model="item.isComplete">
          <s v-if="item.isComplete">
            <label>{{item.message}}</label>
          </s>
          <label v-else>{{item.message}}</label>
        </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BoundingBox from '@/components/BoundingBox.vue';
import BoundingBoxType from '@/types/BoundingBoxType';
import { BoundingBoxStatus } from '@/types/BoundingBoxStatus';
import Button from '@/components/Button.vue'
import TodoItem from '@/types/TodoItem';

@Component({
  components: {
    BoundingBox,
    Button
  }
})
export default class DrawArea extends Vue{

  private boundingBoxTypes: BoundingBoxType[] = [];

  private isCreatingBoundingBox: boolean = false;

  private currentBoundingBox: BoundingBoxType | null = null;

  private offsetX   : number = 0;
  private offsetY   : number = 0;
  private beginDrag : boolean = false;


  private todoMessage: string = '';
  private todoItems: TodoItem[] = [];

  save() {
    this.todoItems.push(new TodoItem(this.todoMessage, this.todoMessage === 'complete'));
    this.todoMessage = '';
  }

  deleteCompletedItems() {
    this.todoItems = this.todoItems.filter(item => !item.isComplete);
  }

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

  onButton1Click() {
    alert('ボタン1がクリックされました。')
  }

  onButton2Click() {
    alert('ボタン2がクリックされた気がします。')
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

  get button2Text() {
    return 'Button Second'
  }
  

  /**
    * バウンディングボックス以外をクリックしたら選択状態を解除する。
    */
  onClick() {
    this.currentBoundingBox = null;
    this.boundingBoxTypes.map(x => x.isSelected = BoundingBoxStatus.NotSelected);
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
    }

  }

  onMouseUp() {
    this.beginDrag = false;
    this.isCreatingBoundingBox = false;
  }

  onMouseLeave() {
    this.beginDrag = false;
    this.isCreatingBoundingBox = false;
    // this.boundingBoxTypes.map(x => x.isSelected = BoundingBoxStatus.NotSelected);
  }


  // svg上でのマウス座標の返却
  private computeMousePosition(event: MouseEvent): {x: number, y: number } {
    const svg = <SVGElement>this.$refs.svg;
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


