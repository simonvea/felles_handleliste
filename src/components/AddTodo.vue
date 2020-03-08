<template>
  <section class="addTodo__container">
    <div v-if="showAddTodo">
      <label>
        Todo:
        <input
          ref="addTodoField"
          v-model="todoText"
          maxlength="15"
          @keydown.enter="submitTodo"
          @blur="toggleAddTodo"
        />
      </label>
      <button :disabled="isNotText" @click="submitTodo">Legg til</button>
    </div>
    <Button v-else class="addTodo__toggle-button" @click="toggleAddTodo">
      <font-awesome-icon icon="plus-circle" />
    </Button>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";

@Component({
  methods: {
    ...mapActions(["addTodo"])
  }
})
export default class AddTodo extends Vue {
  @Prop() private todo!: string;

  todoText: string = this.todo || "";

  showAddTodo = false;

  $refs!: {
    addTodoField: HTMLFormElement;
  };

  toggleAddTodo() {
    if (this.todoText) return;
    this.showAddTodo = !this.showAddTodo;
    // if (this.showAddTodo) this.$refs.addTodoField.focus();
  }

  get isNotText() {
    return !this.todoText;
  }

  submitTodo() {
    if (this.isNotText) return;
    this.addTodo(this.todoText);
    this.todoText = "";
  }
}
</script>

<style>
.addTodo__container {
  width: 100%;
  position: absolute;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.addTodo__toggle-button {
  background-color: white;
  border: none;
  color: DodgerBlue;
  /* padding: 12px 16px;
  font-size: 16px; */
  cursor: pointer;
  font-size: 3rem;
}
</style>
