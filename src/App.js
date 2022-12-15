import { useState } from "react";
import { useSelector } from "react-redux";
import ToDoListContainer from "./component/ToDoListContainer";
import { useAddTodosMutation, useGetTodosQuery } from "./features/todo/todoApi";
import "./styles.css";

const App = () => {
  const [text, setText] = useState("");
  //To Add new todo data
  const [addTodos, { isSuccess: addSuccess }] = useAddTodosMutation();
  const {
    data: todos,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useGetTodosQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const addItem = () => {
    if (text) {
      addTodos({ name: text, type: "todo" });
      setText("");
    }
  };

  return (
    <div>
      <div className="input-field">
        <input
          type="text"
          placeholder="Write Your Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="add-button" onClick={addItem}>
          ADD
        </button>
      </div>
      <h2 style={{ textAlign: "center" }}>To-Do List</h2>
      {isError ? (
        <h3 style={{ color: "red", textAlign: "center", fontWeight: "500" }}>
          Some Error occurred..Please run json server <p>-cd server</p>{" "}
          <p>-npm start</p>
        </h3>
      ) : (
        <ToDoListContainer todos={todos} />
      )}
    </div>
  );
};

export default App;
