import React, { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { FaBeer } from "react-icons/fa";

import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { useDispatch, useSelector } from "react-redux";
import { storedTasks } from "../features/todo/todoSlice";

const lists = ["todo", "inprogress", "done"];

// const initialTasks = [
//   { id: 1, name: "Learning JS", type: "todo" },
//   { id: 2, name: "Learning React.js", type: "todo" },
//   { id: 3, name: "Learning Express.js", type: "todo" },
//   { id: 4, name: "Learning MongoDB", type: "todo" },
//   { id: 5, name: "Becoming a fullstack developer", type: "todo" },
// ];

const ToDoListContainer = ({ todos }) => {
  const dispatch = useDispatch();
  // const [tasks, setTasks] = useState([...todos]);
  const localData = JSON.parse(localStorage.getItem("task-list"));
  const tasksFromLocalStorage = localData?.tasks;
  console.log(tasksFromLocalStorage);

  const { tasks } = useSelector((state) => state.todosInfo) || [];
  console.log("todos from listcontainer", tasks);

  const onDragEnd = (event) => {
    const { over, active } = event;
    console.log({ over, active });
    // setTasks(
    //   tasks.map((item) => {
    //     if (item.id === active.id) {
    //       return {
    //         ...item,
    //         type: over.id,
    //       };
    //     }

    //     return item;
    //   })
    // );
    dispatch(
      storedTasks(
        tasks.map((item) => {
          if (item.id === active.id) {
            return {
              ...item,
              type: over.id,
            };
          }

          return item;
        })
      )
    );
    //update local storage after drag and drop
    localStorage.setItem(
      "task-list",
      JSON.stringify({
        tasks: tasks.map((item) => {
          if (item.id === active.id) {
            return {
              ...item,
              type: over.id,
            };
          }

          return item;
        }),
      })
    );
  };

  const getTasks = (type) => {
    console.log(
      "gettasks",
      tasksFromLocalStorage?.filter((item) => item.type === type)
    );
    return tasksFromLocalStorage?.filter((item) => item.type === type);
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="container">
        {lists.map((item) => (
          <Droppable key={item} id={item}>
            <h1 className="title">{item.toUpperCase()}</h1>
            {getTasks(item)?.map((task) => (
              <Draggable key={task.id} id={task.id}>
                <h1 className="title">{task.name}</h1>
              </Draggable>
            ))}
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
};

export default ToDoListContainer;
