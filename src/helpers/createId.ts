import { Todo } from "@/store/types";

export const findHighestId = (todos: Todo[]): number => {
  if (todos.length < 1) return 1;
  const ids = todos.map(todo => Number(todo.id));
  const highestId = Math.max(...ids);
  return highestId;
};
