import logoPicture from "./pictures/logo192.png";
import Tasks from "./Components/Tasks";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ChangeTask from "./Components/ChangeTask";

function App() {
  const [taskArray, setTaskArray] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  }, [taskArray]);

  const [taskInputValue, setTaskInputValue] = useState("");

  function handleChangeInputTask(event) {
    setTaskInputValue(event.target.value);
  }

  function createNewTask(taskText) {
    const newTask = {
      id: nanoid(),
      body: taskText,
      completed: false,
    };
    setTaskArray((prev) => [newTask, ...prev]);
    setTaskInputValue("");
  }

  function changeTaskState(id) {
    setTaskArray((oldTasks) => {
      const newArray = [];
      for (let i = 0; i < oldTasks.length; i++) {
        const oldTask = taskArray[i];

        if (oldTask.id === id) {
          newArray.push({ ...oldTask, completed: !oldTask.completed });
        } else {
          newArray.push(oldTask);
        }
      }
      return newArray;
    });
  }

  function deleteTask(id) {
    setTaskArray((oldTasks) =>
      oldTasks.filter((singleTask) => singleTask.id !== id)
    );
  }

  return (
    <div className="app">
      <img src={logoPicture} alt="React logo"></img>
      <div className="container">
        <header>
          <h1 className="app-header">React - TO DO</h1>
          <div>
            <input
              placeholder="Add a new task..."
              onChange={handleChangeInputTask}
              name="inputTask"
              value={taskInputValue}
            />
            <button
              onClick={() => createNewTask(taskInputValue)}
              className="btn-add"
            >
              ADD
            </button>
          </div>
        </header>
        <div className="container-tasks">
          <h2>Task list:</h2>
          {taskArray.length > 0 && (
            <Tasks
              deleteTask={deleteTask}
              changeTaskState={changeTaskState}
              taskArray={taskArray}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
