<template lang="pug">
  .tabs
    .tab(
      v-for='tab in tabs' 
      :key='tab.value' 
      @click='openTab(tab.value)'
      :class='{ active : tab.value === activeTab }'
    )
      span {{tab.name}}
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'nuxt-property-decorator'
import { Options } from 'pug'

@Component
export default class Tabs extends Vue {
  @Prop({ default: null })
  private tabs!: Options[]

  private activeTab: string = ''

  private openTab(value: string) {
    this.activeTab = value
    this.$emit('openTab', this.activeTab)
  }
}
</script>

<style lang='scss' scoped>

.tabs {
  display: flex;
  align-items: center;
  display: inline-flex;
  border-bottom: 1px solid green;
  margin-bottom: 15px;
}

.tab {
  cursor: pointer;
  padding: 7px 0;
  color: green;

  &:not(:last-child) {
    margin-right: 20px;
  }

  &.active {
    color: black;
    border-bottom: 1px solid green;
  }

}
</style>