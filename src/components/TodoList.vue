<template>
  <transition-group name="fade" tag="ul" class="todo-list">
    <li
      v-for="todo in todos"
      :key="todo.id"
      :class="{ completed: todo.completed }"
      class="todo-item"
    >
      <span @click="toggleComplete(todo)">{{ todo.text }}</span>
      <button @click="deleteTodo(todo.id)">Delete</button>
    </li>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TodoList",
  props: {
    todos: {
      type: Array as PropType<{ id: number; text: string; completed: boolean }[]>,
      required: true,
    },
  },
  emits: ["toggle-complete", "delete-todo"],
  methods: {
    toggleComplete(todo: { id: number; text: string; completed: boolean }) {
      this.$emit("toggle-complete", todo.id);
    },
    deleteTodo(id: number) {
      this.$emit("delete-todo", id);
    },
  },
});
</script>

<style>
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin: 5px 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.todo-item.completed span {
  text-decoration: line-through;
  color: gray;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
