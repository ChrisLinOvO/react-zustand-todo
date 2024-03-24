import * as React from "react";
import { useRef, FormEvent } from "react";
import useTodo from "./state/useTodo";

const TodoForm: React.FC = () => {
  const { addNewTodo } = useTodo();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || !inputRef.current.value.trim()) return;

    const value = inputRef.current.value.trim();
    addNewTodo(value);

    inputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Type in Something ..." ref={inputRef} />
    </form>
  );
};

export default TodoForm;
