<template lang="pug">
  .age
    .age__fields
      .label от
      InputText(
        :value='age.from'
        @input='(value) => {age.from = value}'
        type='int'
      ).input
      .label до
      InputText(
        :value='age.to'
        type='int'
        @input='(value) => {age.to = value}'
      ).input
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import InputText from '@/components/_uikit/controls/InputText.vue'

@Component({
  components: {
    InputText
  }
})
export default class Age extends Vue {
  @Prop({ default: null })
  private age!: any

  @Watch('age')
  private chengeAge() {
    this.$emit('input', this.age)
  }
}
</script>

<style lang="scss" scoped>
.age {

  &__fields {
    display: flex;
    align-items: center;
  }
}

.label {
  margin-right: 10px;
}

.input {
  margin-right: 20px;
}
</style>