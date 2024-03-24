import * as React from "react";
import useTodo, { Todo } from "./state/useTodo";

const Todos: React.FC = () => {
  const {
    todos,
    toggleCompleteTodo,
    deleteTodo,
    toggleEditTodo,
    updateEditingTodoContent,
  } = useTodo();
  console.log(todos);
  return (
    <div>
      {todos.map((todo: Todo) => (
        <div className="todo" key={todo.id}>
          {todo.edit ? (
            <div>
              <input
                value={todo.todoContent}
                onChange={(e) =>
                  updateEditingTodoContent(todo.id, e.target.value)
                }
              />
              <button className="save" onClick={() => toggleEditTodo(todo.id)}>
                Save
              </button>
            </div>
          ) : (
              <div>
                <span
                  style={{
                    textDecoration: todo.complete ? "line-through" : undefined,
                  }}
                >
                  {todo.todoContent}
                </span>
                <button
                  className="toggle"
                  onClick={() => toggleCompleteTodo(todo.id)}
                >
                  Complete
              </button>

                <button className="edit" onClick={() => toggleEditTodo(todo.id)}>
                  Edit
              </button>
                <button className="delete" onClick={() => deleteTodo(todo.id)}>
                  Delete
              </button>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default Todos;
