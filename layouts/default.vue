<template lang='pug'>
  .layout
    .sidebar
      NuxtLink(
        v-for='(route, index) in routes'
        :key='index'
        :to='route.route'
      ).link
        span {{route.name}}
    .content
      Nuxt
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class Type extends Vue {
  private routes = [
    { name: 'Опросы', route: '/' },
    { name: 'Пользователи', route: '/home' },
    { name: 'Черные списки', route: '/' },
    { name: 'Колл-центр', route: '/' }
  ]
}
</script>

<style>

.sidebar {
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  width: 180px;
}

html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}

.layout {
  max-width: 1330px;
  margin: auto;
  display: flex;
}

.content {
  padding: 50px 20px;
  flex: 1
}

.link {
  margin-bottom: 20px;
  color: black;
  text-decoration: none;
}

a.nuxt-link-exact-active {
  color: #00c58e;
}
</style>
