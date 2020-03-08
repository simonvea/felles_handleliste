<template>
  <li class="todo__item">
    <div class="todo__checkbox-flex-container">
      <label class="todo__checkbox-container">
        <input
          :id="todo.id"
          v-model="todo.done"
          type="checkbox"
          class="todo__checkbox"
          maxlength="15"
        />
        <span class="todo__checkmark"></span>
      </label>
    </div>
    <input
      v-model="todo.name"
      type="text"
      class="todo__input"
      :class="{ 'todo__input--done': todo.done }"
      :disabled="todo.done"
    />
    <button class="todo__delete" @click="deleteTodo(todo.id)">
      <font-awesome-icon icon="trash-alt" />
    </button>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Todo } from "@/store/types";
import { mapActions } from "vuex";

@Component({
  methods: {
    ...mapActions(["deleteTodo"])
  }
})
export default class TodoItem extends Vue {
  @Prop() private todo!: Todo;
}
</script>

<style>
.todo__item {
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  border-bottom: 0.5px solid grey;
  width: 100vw;
  margin: 4px 0;
  padding: 4px 0;
}

.todo__input--done {
  text-decoration: line-through;
}

.todo__input {
  border: none;
  font-size: 20px;
  margin-top: -4px;
}

.todo__checkbox-flex-container {
  height: 100%;
}

/* The container */
.todo__checkbox-container {
  /* display: block; */
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 100%;
  margin: -4px 0;
}

/* Hide the browser's default checkbox */
.todo__checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.todo__checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #eee;
}

/* When the checkbox is checked, add a blue background */
.todo__checkbox:checked ~ .todo__checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.todo__checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.todo__checkbox:checked ~ .todo__checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.todo__checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.todo__delete {
  background-color: white;
  border: none;
  color: DodgerBlue;
  /* padding: 12px 16px;
  font-size: 16px; */
  cursor: pointer;
  font-size: 22px;
}

.todo__delete:hover {
  color: red;
}
</style>
