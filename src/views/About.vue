<template>
  <div class="about">
    <h1>Fullførte handlinger</h1>
    <ul>
      <li v-for="todo in doneTodos" :key="todo.id" class="todo__item">
        {{ todo.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
export default class About extends Vue {
  get doneTodos() {
    return this.$store.state.todos.filter(todo => todo.done);
  }
}
</script>
