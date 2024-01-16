import React, { useState } from "react";
import "./App.css";

function Input(props) {
  const [todo, setTodo] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.setTodos((prevTodos) => [
          ...prevTodos,
          { id: Date.now(), text: todo },
        ]);
        setTodo("");
      }}
    >
      <input
        type="text"
        className="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter text!"
      />
      <button type="submit" className="button">
        Add
      </button>
    </form>
  );
}

function EditInput(props) {
  const [todo, setTodo] = useState(props.todo.text);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.setTodos((prevTodos) =>
            prevTodos.map((item) => {
              if (item.id === props.todo.id) {
                return { ...item, text: todo };
              }
              return item;
            })
          );
          setTodo("");
          props.setIsEdit(false);
        }}
      >
        <input
          type="text"
          className="input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="button button-success">
          Save
        </button>
      </form>
      <button className="button" onClick={() => props.setIsEdit(false)}>
        Cancel
      </button>
    </>
  );
}

function TodoItem(props) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div
      className={["sub-todo-item", props.todo.done && "done"]
        .filter(Boolean)
        .join(" ")}
    >
      {isEdit ? (
        <EditInput
          setTodos={props.setTodos}
          todo={props.todo}
          setIsEdit={setIsEdit}
        />
      ) : (
        props.todo.text
      )}

      <button className="button" onClick={() => setIsEdit(true)}>
        Edit
      </button>
    </div>
  );
}
function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Get a haircut by Saturday", done: false },
    { id: 2, text: "Do a manicure by Saturday", done: false },
  ]);
  const done = todos.filter((todo) => todo.done).length;
  return (
    <div className="App">
      <img
        className="title"
        src="./logo192.jpg"
        height="20"
        width="60"
        alt="logo"
      />
      <Input setTodos={setTodos} />
      <p className="donetext">
        Done:<span className="button-danger"> {done}</span>/<span className="button-success">{todos.length}</span>
      </p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              className="input"
              value={todo.done}
              onChange={(e) =>
                setTodos((prevTodos) =>
                  prevTodos.map((item) => {
                    if (item.id === todo.id) {
                      return { ...item, done: !item.done  };
                    }
                    return item;
                  })
                )
              }
            />

            <TodoItem todo={todo} setTodos={setTodos} />
            <button
              className="button button-danger"
              onClick={() =>
                setTodos((prevTodos) =>
                  prevTodos.filter((item) => item.id !== todo.id)
                )
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
