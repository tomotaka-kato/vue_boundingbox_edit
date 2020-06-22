<template>
  <button @click="onClickHandler" :style="styles">
    {{text}}
  </button>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue{

  @Prop() private text!    : string;
  @Prop() private onClick?: () => void;
  @Prop() private color?: string;


  private onClickHandler() {
    if(this.onClick) {
      this.onClick();
    }
  }

  private get styles() {
    if(this.color) {
      return { background: this.color }
    } else {
      return { background: '#668ad8' }
    }
  }
  
}



</script>


<style lang="scss" scoped>
  button {
    display: inline-block;
    position: relative;
    padding: 0.35em 1em;
    color: #FFF;
    text-decoration: none;
    font-size: 25pt;;
  }
</style>
