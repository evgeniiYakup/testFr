<template lang="pug">
  .status
    Select(
      :options='optionsStatuses'
      v-model='currentType'
    )
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import Select from '@/components/_uikit/controls/Select.vue'
import api from '~/utils/api'

@Component({
  components: {
    Select
  }
})
export default class Status extends Vue {

  private currentType: any = ''

  @Prop({ default: null })
  private status!: any

  @Watch('currentType')
  private chengeCurrentType() {
    this.$emit('input', this.currentType)
  }

  @Watch('age')
  private chengeAge() {
    this.$emit('input', this.status)
  }

  // получение списка статусов(api не увидел)
  // private mounted() {
  //   this.fetchStatuses()
  // }

  // private async fetchStatuses() {
  //   const { data } = await api.get('/api/statuses')
  //   this.statuses = data
  // }

  private get optionsStatuses() {
    return [
      { name: 'Активна', value: '1' },
      { name: 'Заблокирована', value: '2' },
    ]
  }
}
</script>

<style lang="scss" scoped>

</style>