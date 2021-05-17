<template lang="pug">
  .button(@click='$emit("click")' :class='`button-color_${color}`')
    slot
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Button extends Vue {
  @Prop({ default: 'green' })
  private color!: string
}
</script>

<style lang="scss" scoped>
.button {
  padding: 10px 20px;
  border: 1px solid;
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;

  &-color {

    &_red {
      border-color: red;
      color: red;
    }

    &_green {
      border-color: green;
      color: green;
    }
  }
}
</style>