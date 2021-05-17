<template lang="pug">
  .respondents
    .respondents__title Добавить опрос
    div
      .respondents__condition(v-for='(condition, index) in conditions' :class='`respondents__condition_${condition.name || "default"}`')
        .grid
          .label
            span Условие {{index + 1}}
          .content
            Select(v-model='condition.name' :options='conditionsList')
        
        template(v-if='condition.name === "type"')
          .respondents__controls(v-for='(type, indexType) in condition.types' :key='index')
            .grid
              .label
                span Тип {{indexType + 1}}
              .content
                Type(
                  :type="type"
                  @input="(value) => { $set(condition.types, indexType, value) }"
                )
          .grid
            .respondents__actions
              Button.button_delete(@click='addMore(index, "types")' color='green') Добавить тип

        template(v-if='condition.name === "age"')
          .respondents__controls(v-for='(age, indexAge) in condition.age' )
            .grid
              .label
                span Диапазон {{indexAge + 1}}
              .content
                Age(
                  :age="age"
                  @input="(value) => {age = value}"
                )
          .grid
            .respondents__actions
              Button.button_delete(@click='addMore(index, "age")' color='green') Добавить Диапазон

        template(v-if='condition.name === "status"')
          .respondents__controls(v-for='(status, indexStatus) in condition.statuses' :key='indexStatus')
            .grid
              .label
                span Статус {{indexStatus + 1}}
              .content
                Status(
                  :status="status"
                  @input="(value) => {$set(condition.statuses, indexStatus, value)}"
                )
          .grid
            .respondents__actions
              Button.button_delete(@click='addMore(index, "statuses")' color='green') Добавить статус

        Button.button_delete(@click='deleteCondition(index)' color='red' :class='{ top : condition.name !== "" }') удалить условие
        
    .button-add-condition(@click='addNewCondition' color='green') 
      span Нажмите, чтобы добавить новое условие выборки. <br>
        | Все условия связываются между собой логическим "И"
    
    .respondents__action-form
      Button.button_delete(@click='test' color='green') Протестировать опрос
      Button.button_delete(@click='nextStep' color='green') Далее
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import InputText from '@/components/_uikit/controls/InputText.vue'
import Select from '@/components/_uikit/controls/Select.vue'
import Button from '@/components/_uikit/buttons/Button.vue'
import Age from '@/components/conditions/Age.vue'
import Status from '@/components/conditions/Status.vue'
import Type from '@/components/conditions/Type.vue'
import { Option } from '@/interfaces'
import api from '@/utils/api'

@Component({
  components: {
    Select,
    InputText,
    Button,
    Status,
    Type,
    Age,
  }
})
export default class Respondents extends Vue {
  private conditions: any = [
    {
      name: '',
      age: [{
        from: '',
        to: '',
      }],
      types: [''],
      statuses: [''],
    }
  ]

  private test() {
    console.log('test')
  }

  private nextStep() {
    api.post('/sendForm', this.conditions)
    console.log('nextStep')
  }

  private addMore(index: number, type: string) {
    switch(type) {
      
      case 'age':  // if (x === 'value2')
        this.conditions[index][type].push({ from: '', to: '' })
        break

      default:
        this.conditions[index][type].push('')
        break
    }
  }

  private deleteCondition(index: number) {
    this.conditions.splice(index, 1)
  }

  private conditionsList: Option[] = [
    { name: 'Возраст респондента', value: 'age' },
    { name: 'Тип карты лояльности', value: 'type' },
    { name: 'Статус карты лояльности', value: 'status' },
  ]

  private addNewCondition() {
    this.conditions.push({
      name: '',
      age: [{
        from: null,
        to: null,
      }],
      types: [''],
      statuses: [''],
    })
  }
}
</script>

<style lang="scss" scoped>
.respondents {

  &__title {
    font-weight: 600;
    color: rgb(204, 204, 204);
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    grid-column: 4/-1;
  }

  &__condition {
    position: relative;
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-bottom: 1px solid gray;

    &:not(:first-child) {

      &:before {
        content: 'И';
        border-radius: 4px;
        width: 50px;
        height: 50px;
        position: absolute;
        top: -25px;
        left: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }


    &_age {
      background-color: #FFFCF5;
      &:before {
        background-color: #e9e6de;
      }
    }

    &_type {
      background-color: #F8FAFF;
      &:before {
        background-color: #E5F0FA;
      }
    }

    &_status {
      background-color: #FAFFF8;
      &:before {
        background-color: #E7F6DB;
      }
    }

    &_default {
      background-color: #FAFAFA;

      &::before {
        display: none !important;
      }
    }
  }

  &__action-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 80px;
  }

  &__controls {
    width: 100%;
    margin: 20px 0;
  }
}

.button {
  margin-top: 20px;
}


.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 20px;
  align-items: center;
}

.label {
  grid-column: 1/4;
}

.content {
  grid-column: 4/-1;
}

.button-add-condition {
  width: 100%;
  border: 1px dashed green;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 150px;
  color: green;
  text-align: center;
  margin-top: 40px;
}

.button_delete {
  position: relative;

  &.top {
    top: -60px;
  }
}
</style>