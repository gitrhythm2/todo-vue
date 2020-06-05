<template>
  <div>
    <label v-for="opt in todoModel.options" :key="opt.state">
      <input type="radio" v-model="condition" :value="opt.state">
      {{ opt.label}}
    </label>
    ({{ todoCount }}件を表示)
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import TodoModel from '@/models/TodoModel'

@Component
export default class TodoCondition extends Vue {
  condition = -1

  @Prop({ type: Object, required: true })
  todoModel!: TodoModel

  @Watch('condition')
  conditionChange (newValue: number) {
    console.log('Emit conditionChange newvalue[' + newValue + ']')
    this.$emit('change', newValue)
  }

  get todoCount () {
    return this.todoModel.findList(this.condition).length
  }
}
</script>
