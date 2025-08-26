import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import edit_icon from "../assets/edit.png";
import delete_icon from "../assets/delete.png";

const TodoItems = ({
  text,
  id,
  isComplete,
  deleteTask,
  toggleTask,
  editTask,
  saveTask,
  editingId,
  editingText,
  setEditingText,
}) => {
  const isEditing = editingId === id;

  return (
    <div className="flex items-center py-2 mx-2 gap-2">
      <div
        onClick={() => {
          toggleTask(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img
          className="w-8 cursor-pointer hover:scale-110 active:scale-90 transition-transform duration-150"
          src={isComplete ? tick : not_tick}
          alt=""
        />

        {isEditing ? (
          <input
            type="text"
            value={editingText}
            onChange={(e) => {
              setEditingText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveTask(id);
            }}
            className="ml-4 text-[17px] border-b border-gray-400 outline-none flex-1"
            autoFocus
          />
        ) : (
          <p
            className={`ml-4 text-slate-700 text-[17px] ${
              isComplete ? "line-through" : ""
            }`}
          >
            {text}
          </p>
        )}
      </div>

      {isEditing ? (
        <button
          onClick={() => saveTask(id)}
          className="text-sm bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer
             shadow-md hover:bg-green-600 hover:shadow-lg
             active:scale-95 transition-all duration-150"
        >
          Save
        </button>
      ) : (
        <>
          <img
            onClick={() => {
              editTask(id);
            }}
            className="w-6 cursor-pointer opacity-70 hover:opacity-100 active:scale-90 transition-transform duration-150"
            src={edit_icon}
            alt=""
          />

          <img
            onClick={() => {
              deleteTask(id);
            }}
            className="w-5 cursor-pointer opacity-80 hover:opacity-100 active:scale-90 transition-transform duration-150"
            src={delete_icon}
            alt="delete"
          />
        </>
      )}
    </div>
  );
};

export default TodoItems;
