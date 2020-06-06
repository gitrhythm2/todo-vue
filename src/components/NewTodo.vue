<template>
  <div>
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

  onSubmit () {
    this.todoModel.add(this.newTask)
    this.newTask = ''
  }
}
</script>
