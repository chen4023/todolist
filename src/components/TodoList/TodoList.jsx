import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

export default function TodoList({ filter }) {
  // const todolist = localStorage.getItem("todos");
  // const [todos, setTodos] = useState(JSON.parse(todolist) || []);
  const [todos, setTodos] = useState(readTodosFromLocalStorage);

  const handleAdd = (todo) => {
    //새로운 todo를 업데이트하는 로직
    setTodos([...todos, todo]);
  };

  const handleDelete = (deleted) => {
    // setTodos((prevTodos) => {
    //   const newTodos = todos.filter((t) => deleted.id !== t.id);
    //   localStorage.setItem("todos", JSON.stringify(newTodos));
    //   return newTodos;
    // });
    setTodos(todos.filter((t) => deleted.id !== t.id));
  };
  const handleUpdate = (updated) => {
    // setTodos((prevTodos) => {
    //   const newTodos = todos.map((t) => (t.id === updated.id ? updated : t));
    //   localStorage.setItem("todos", JSON.stringify(newTodos));
    //   return newTodos;
    // });
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function getFilteredItems(todos, filter) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}

function readTodosFromLocalStorage() {
  console.log("readTodosFromLocalStorage");
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
