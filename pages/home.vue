<template lang="pug">
  .home
    Tabs(:tabs='tabList' @openTab='openTab')

    .home__section(
      v-for='tab in tabList'
      :key='tab.value'
      v-if='tab.value === activeTab'
    ) 
      component(v-bind:is='tab.component')
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Tabs from '@/components/_uikit/Tabs.vue'

import Params from '@/components/sections/Params.vue'
import Questions from '@/components/sections/Questions.vue'
import Logics from '@/components/sections/Logics.vue'
import Conditions from '@/components/sections/Conditions.vue'
import Respondents from '@/components/sections/Respondents.vue'

@Component({
  components: {
    Tabs,
    Params,
    Questions,
    Logics,
    Conditions,
    Respondents
  }
})
export default class Home extends Vue {
  private activeTab: string = 'respondents'

  private openTab(value: string) {
    this.activeTab = value
  }

  private tabList = [
    { name: 'Параметры', value: 'params', component: 'Params' },
    { name: 'Вопросы', value: 'questions', component: 'Questions' },
    { name: 'Логика', value: 'logics', component: 'Logics' },
    { name: 'Условия', value: 'conditions', component: 'Conditions' },
    { name: 'Респоденты', value: 'respondents', component: 'Respondents' },
  ]
}
</script>

<style>
.home {
  /* margin: auto 200px;
  min-height: 100vh; */
}
</style>
