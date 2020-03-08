<template>
  <section class="handleliste">
    <h1>Handleliste</h1>
    <ul class="handleliste__liste">
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </ul>
    <AddTodo />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapActions } from "vuex";
import AddTodo from "@/components/AddTodo.vue";
import TodoItem from "@/components/TodoItem.vue";

@Component({
  components: { AddTodo, TodoItem },
  methods: {
    ...mapActions([
      "updateTodo",
      "deleteTodo",
      "setDoneAsNotShow",
      "fetchTodos",
      "saveTodos"
    ])
  }
})
export default class Home extends Vue {
  get todos() {
    return this.$store.state.todos.filter(todo => !todo.notShow);
  }
  created() {
    this.fetchTodos();
  }

  beforeDestroy() {
    this.setDoneAsNotShow();
    this.saveTodos();
  }
}
</script>

<style scoped>
.handleliste {
  height: 100%;
  position: relative;
}

.handleliste__liste {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 0;
  padding-left: 0;
}
</style>
