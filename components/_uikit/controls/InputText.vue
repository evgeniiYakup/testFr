<template lang='pug'>
  .input-text(:class='[{ focused: focused || value !== "" }, { "error" : error }]')
    input(
      :type='type ==="int" ? "number" : type'
      v-model='currentValue'
      @input='onInput'
      :name='nameInp'
      :disabled='disabled'
      step='1'
      @focus="focused = true"
      @blur="focused = false"
    )
    label(:class='{ active : value }') {{label}}
    span.error-input(v-show='error') {{ error }}

</template>

<script>
export default {
  name: 'InputText',
  props: {
    value: String,
    nameInp: String,
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: 'text',
      validator: val => {
        return (
          ['url', 'text', 'int', 'password', 'email', 'search'].indexOf(val) !== -1
        )
      }
    }
  },
  watch: {
    value() {
      this.currentValue = this.value
    }
  },
  data() {
    return {
      currentValue: '',
      focused: false
    }
  },
  mounted() {
    this.currentValue = this.value
  },
  methods: {
    onInput(e) {
      if (this.type === 'int') {
        this.currentValue = e.target.value.replace(/[^\d.]/g, '')
      }
      this.$emit('input', this.currentValue)
    },
  }
}
</script>

<style scoped lang="scss">
  .input-text {
    height: 50px;
    border: 1px solid gray;
    border-radius: 4px;
    position: relative;

    // &:hover {
    //   border-color: $color-hover;
    // }

    label {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      pointer-events: none;

      &.active {
        font-size: 16px;
        pointer-events: none;
        top: 0px;
        transition: 0.3s ease all;
        background: white;
        font-size: 10px;
        padding: 0 2px;
        border-radius: 2px;
      }
    }

    input {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      z-index: 1;
      position: relative;
      background: transparent;
      padding-left: 10px;

      &:focus ~ label {
        font-size: 16px;
        pointer-events: none;
        top: 0px;
        transition: 0.3s ease all;
        background: white;
        font-size: 10px;
      }
    }

    &.error {
      border-color: red;

      label {
        color: red;
      }
    }

    .error-input {
      color: red;
      font-size: 12px;
      position: absolute;
      bottom: -18px;
      left: 0;
      z-index: 150;
    }
  }
</style>