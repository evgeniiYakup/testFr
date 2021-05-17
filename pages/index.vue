<template lang="pug">
  .index
    NuxtLink(to='/home')
      span Перейти
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Home extends Vue {
}
</script>

<style>
.home {
  /* margin: auto 200px;
  min-height: 100vh; */
}
</style>
