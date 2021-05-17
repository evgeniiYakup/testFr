<template lang='pug'>
  .select(:class='{ error : errors }')
    label(v-if='value && placeholder') {{placeholder}}
    v-select(
      :reduce="country => country.value"
      @input='select'
      :value='this.selected'
      :required='requiredSelect'
      :disabled='disabled'
      :class="disabled ? 'select-disable' : ''"
      :options='options'
      label='name'
      :placeholder='placeholder'
      :calculatePosition='withPopper'
    )
    .error
      span {{errors}}

</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'
import { createPopper } from '@popperjs/core'

import 'vue-select/src/scss/vue-select.scss'

export default {
  components: {
    'v-select': vSelect
  },
  name: 'Select',
  props: ['value', 'options', 'placeholder', 'requiredSelect', 'disabled', 'errors', 'invalid', 'multiple'],
  watch: {
    value(value) {
      this.selected = value
    }
  },
  mounted() {
    Vue.nextTick()
      .then(() => {
        this.selected = Number(this.value)
      })
  },
  data: () => ({
    selected: '',
  }),
  methods: {
    select(selected) {
      this.selected = selected
      this.$emit('input', this.selected)
    },
    withPopper (dropdownList, component, { width }) {
      dropdownList.style.width = width
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: 'bottom',
        modifiers: [
          {
            name: 'offset', options: {
              offset: [0, -1]
            }
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn ({ state }) {
              component.$el.classList.toggle('drop-up', state.placement === 'top')
            },
          }]
      })
      return () => popper.destroy()
    }

  },
}
</script>

<style scoped lang="scss">
  .select {
    position: relative;

    ::v-deep .vs__dropdown-toggle {
      border: 0;
      border: 1px solid gray;
      border-radius: 4px;
      padding: 10px 10px 10px 5px;
      height: 50px;

      // &:hover {
      //   border: 1px solid $color-hover;
      // }
    }

    label {
      position: absolute;
      font-size: 10px;
      background-color: white;
      z-index: 1;
      padding: 5px;
      left: 10px;
      top: -12px;
    }

    .error {
      color: red;
      font-size: 12px;
    }

    // &.error {
    //   ::v-deep .vs__dropdown-toggle {
    //     border: 1px solid $color-active;
    //   }
    // }

    ::v-deep .vs__search {
      position: absolute;
      width: 100%;
      top: 50%;
      margin: 0;
      transform: translateY(-50%);

      &::placeholder {
        color: gray;
      }
    }

    ::v-deep .vs__selected {
      position: absolute;
      width: 100%;
      top: 50%;
      margin: 0;
      transform: translateY(-50%);
    }

    ::v-deep .vs__dropdown-menu {
      max-height: 200px !important;
    }

    ::v-deep .vs__actions {
      padding: 0;
    }

    // ::v-deep .vs--open .vs__dropdown-toggle {
    //   border: 1px solid $color-hover;
    // }
  }
</style>
