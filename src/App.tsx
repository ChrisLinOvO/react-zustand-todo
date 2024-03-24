import * as React from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import Todos from "./Todos";

const App: React.FC = () => {
  return (
    <>
      <TodoForm />
      <Todos />
    </>
  );
}

export default App;