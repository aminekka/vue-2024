import { ref, computed, watch } from "vue";

export default {
  data() {
    return {
      filter: "all", // Options: 'all', 'completed', 'incomplete'
    };
  },
  computed: {
    filteredTodos() {
      return this.todos.filter((todo: any) => {
        if (this.filter === "completed") return todo.completed;
        if (this.filter === "incomplete") return !todo.completed;
        return true;
      });
    },
  },
  watch: {
    filter: {
      immediate: true,
      handler(newVal: string) {
        console.log(`Filter changed to: ${newVal}`);
      },
    },
  },
};
