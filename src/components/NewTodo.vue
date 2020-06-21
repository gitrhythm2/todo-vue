<template>
  <div class="container">
    <form class="form-group" @submit.prevent="onSubmit">
      <input type="text" class="form-control" placeholder="新しいタスク..."
        v-model="newTask"
      >
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TodoModel from '@/models/TodoModel'

@Component
export default class NewTodo extends Vue {
  newTask = ''

  @Prop({ type: Object, required: true })
  todoModel!: TodoModel

  @Prop({ type: Number, required: true })
  condition!: number

  async onSubmit () {
    await this.todoModel.add(this.newTask)
    this.todoModel.fetch(this.condition)
    this.newTask = ''
  }
}
</script>

<style scoped lang="scss">
input[type="text"] {
  padding-left: 0.5rem;
  border: none;
  border-bottom: 1px solid rgba(0,0,0,.125);
}
</style>
