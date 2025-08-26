import React, { useEffect, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Add Task
  const addTask = () => {
    if (newTask.trim() === "") return;

    setTodos([...todos, { id: Date.now(), text: newTask, isComplete: false }]);

    setNewTask("");
  };

  // Delete Task
  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle Task
  const toggleTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  // Start Editing Task
  const editTask = (id) => {
    const todo = todos.find((t) => t.id === id);
    setEditingId(id);
    setEditingText(todo.text);
  };

  // Save Editing Task
  const saveTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-5 min-h-[550px] rounded-xl">
      {/* ---------------- title ---------------- */}

      <div className="flex items-center mt-5 ml-2 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/* ---------------- input box ----------------  */}
      <div className="flex items-center mx-2 my-5 bg-gray-200 rounded-full">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask(e.target.value);
          }}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          placeholder="Add the task"
        />
        <button
          onClick={addTask}
          className="border-none rounded-full bg-orange-500 w-32 h-14 
                text-white text-lg font-medium cursor-pointer
                hover:bg-orange-600 active:scale-95 
                transition-all duration-150 shadow-md hover:shadow-lg"
        >
          Add +
        </button>
      </div>

      {/* ---------------- todo list ----------------  */}
      <div>
        {todos.map((item) => {
          return (
            <TodoItems
              key={item.id}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              editTask={editTask}
              saveTask={saveTask}
              editingId={editingId}
              editingText={editingText}
              setEditingText={setEditingText}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
