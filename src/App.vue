<template>
  <div id="app">
    <h1>To-Do List</h1>
    <div class="controls">
      <input v-model="newTodo" placeholder="Add a new task" />
      <button @click="addTodo">Add</button>
    </div>
    <div class="filters">
      <button @click="setFilter('all')">All</button>
      <button @click="setFilter('completed')">Completed</button>
      <button @click="setFilter('incomplete')">Incomplete</button>
    </div>
    <transition-group name="list" tag="ul" class="todo-list">
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <span @click="toggleStatus(todo)">{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick } from "vue";
import statusMixin from "@/mixins/statusMixin";

export default defineComponent({
  name: "App",
  mixins: [statusMixin],
  data() {
    return {
      newTodo: "",
      todos: reactive<{ id: number; text: string; completed: boolean }[]>([]),
    };
  },
  methods: {
    async addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({
          id: Date.now(),
          text: this.newTodo,
          completed: false,
        });
        this.newTodo = "";
        await nextTick();
        console.log("New to-do added and DOM updated!");
      }
    },
    toggleStatus(todo: any) {
      todo.completed = !todo.completed;
    },
    deleteTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    setFilter(status: string) {
      this.filter = status;
    },
  },
});
</script>

<style>
/* Add some basic styling */
body {
  font-family: Arial, sans-serif;
}
#app {
  max-width: 600px;
  margin: auto;
}
.controls,
.filters {
  margin: 10px 0;
}
.todo-list {
  list-style: none;
  padding: 0;
}
.todo-list li {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin: 5px 0;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.todo-list li.completed span {
  text-decoration: line-through;
  color: gray;
}
.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
