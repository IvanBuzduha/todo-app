import React, { useState } from "react";
import "./App.css";

function Input(props) {
  const [todo, setTodo] = useState("");
  return (
    
    <form
    onSubmit={(e) => {e.preventDefault();
      props.setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: todo },
      ]);
      setTodo("");
    }}
    >
      <input
        type="text" className="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
      type="submit"
      className="button"
      >
        Add
      </button>
    </form>
  );
}

function EditInput(props) {
  const [todo, setTodo] = useState(props.todo.text);
  return (
    <><form
    onSubmit={(e) => {e.preventDefault();
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
        }}>
      <input
        type="text"  className="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"className="button button-success"
      >
        Save
      </button></form>
      <button className="button" onClick={() => props.setIsEdit(false)}>Cancel</button>
    </>
  );
}

function TodoItem(props) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className={['sub-todo-item',props.todo.done && "done"].filter(Boolean).join(" ")}>
      {isEdit ? (
        <EditInput
          setTodos={props.setTodos}
          todo={props.todo}
          setIsEdit={setIsEdit}
        />
      ) : (
        props.todo.text
      )}
      <button className="button" onClick={() => setIsEdit(true)}>Edit</button>
    </div>
  );
}
function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "rrrrrrrrrrr", done: false },
  ]);
  const done = todos.filter((todo) => todo.done).length;
  return (
    <div className="App">
      <hi>Todo App</hi>
      <Input setTodos={setTodos} />
      <p>
        Done{done}/{todos.length}
      </p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox" className="input"
              value={todo.done}
              onChange={(e) =>
                setTodos((prevTodos) =>
                  prevTodos.map((item) => {
                    if (item.id === todo.id) {
                      return { ...item, done: !item.done };
                    }
                    return item;
                  })
                )
              }
            />

            <TodoItem todo={todo} setTodos={setTodos} />
            <button className="button button-denger"
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
