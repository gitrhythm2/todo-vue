<template>
  <div class="container" style="margin-left: 0.5rem;">
    <label v-for="opt in options" :key="opt.state">
      <input type="radio" v-model="condition" :value="opt.state">
      {{ opt.label}}
    </label>
    <span class="count">({{ todoCount }}件を表示)</span>
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
    this.$emit('change', newValue)
  }

  get options () {
    return TodoModel.Options
  }

  get todoCount () {
    return this.todoModel.todos.length
  }
}
</script>

<style scoped lang="scss">
label {
  margin-right: 1rem;
}
.count {
  margin-left: -0.5rem;
}
</style>
