import Vue from "vue";
import Vuex from "vuex";
import { Todo, User } from "./types";
import { findHighestId } from "@/helpers/createId";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [] as Todo[],
    user: {} as User
  },
  mutations: {
    addTodo(state, todo: Todo) {
      state.todos.push(todo);
    },
    deleteTodo(state, id: number) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    },
    updateTodo(state, todo: Todo) {
      state.todos = state.todos.map(oldTodo =>
        oldTodo.id === todo.id ? todo : oldTodo
      );
    },
    addMultipleTodos(state, todos: Todo[]) {
      // check if todos already exist
      const currentTodos = state.todos;
      const newTodos = todos.filter(
        todo => !currentTodos.find(currentTodo => currentTodo.id === todo.id)
      );
      if (newTodos.length > 0) {
        state.todos.push(...newTodos);
      }
    },
    setDoneAsNotShow(state) {
      state.todos = state.todos.map(todo =>
        todo.done ? { ...todo, notShow: true } : todo
      );
    },
    setTodosAsSaved(state) {
      state.todos = state.todos.map(todo => ({ ...todo, saved: true }));
    },
    loginSuccess(state, username: string) {
      state.user = { username, loggedIn: true, loggingIn: false };
    },
    logout(state) {
      state.user = { ...state.user, loggedIn: false, loggingIn: false };
    },
    startLogin(state, username) {
      state.user = { ...state.user, loggingIn: true, username };
    },
    loginFailed(state, error: Error) {
      state.user = {
        ...state.user,
        loggingIn: false,
        loggedIn: false,
        loginError: error
      };
    }
  },
  actions: {
    async addTodo(context, name: string) {
      const highestId = findHighestId(context.state.todos);
      const newId = highestId + 1;
      const newTodo: Todo = { name, id: newId, done: false, saved: false };
      context.commit("addTodo", newTodo);
      localStorage.setItem("todos", JSON.stringify(context.state.todos));
    },
    async deleteTodo(context, id: number) {
      context.commit("deleteTodo", id);
      localStorage.setItem("todos", JSON.stringify(context.state.todos));
    },
    async saveTodos({ state, commit }) {
      const allTodos = [...state.todos];
      localStorage.setItem("todos", JSON.stringify(allTodos));
      commit("setTodosAsSaved");
    },
    async fetchTodos({ commit }) {
      // Fetch from db
      const todosRaw = localStorage.getItem("todos");

      if (todosRaw !== null) {
        const todos = JSON.parse(todosRaw);
        commit("addMultipleTodos", todos);
      } else {
        return;
      }
    },
    async updateTodo({ commit }, updatedTodo: Todo) {
      commit("updateTodo", updatedTodo);
    },
    async setDoneAsNotShow({ commit }) {
      commit("setDoneAsNotShow");
    },
    async login(
      { commit, state },
      payload: { username: string; password: string }
    ) {
      //login
      commit("startLogin", payload.username);
      commit("loginSuccess", payload.username);
      localStorage.setItem("user", JSON.stringify(state.user));
      router.push({ name: "Home" });
    },
    logout({ commit }) {
      localStorage.removeItem("user");
      commit("logout");
      router.push({ name: "Login" });
    },
    init({ commit }) {
      const json = localStorage.getItem("user");
      if (json) {
        const user: User = JSON.parse(json);
        commit("loginSuccess", user.username);
      }
    }
  },
  modules: {}
});
