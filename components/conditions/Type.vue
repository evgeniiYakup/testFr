<template lang="pug">
  .type
    Select(
      :options='optionsStatuses'
      v-model='currentType'
    )
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import Select from '@/components/_uikit/controls/Select.vue'

@Component({
  components: {
    Select
  }
})
export default class Type extends Vue {
  private currentType: any = ''

  @Prop({ default: null })
  private type!: any

  @Watch('currentType')
  private chengeCurrentType() {
    this.$emit('input', this.currentType)
  }

  // получение списка типов(api не увидел)
  // private mounted() {
  //   this.fetchTypes()
  // }

  // private async fetchTypes() {
  //   const { data } = await api.get('/api/types')
  //   this.types = data
  // }

  private get optionsStatuses() {
    return [
      { name: 'Gold', value: '1' },
      { name: 'Silver', value: '2' },
    ]
  }
}
</script>

<style lang="scss" scoped>

</style>