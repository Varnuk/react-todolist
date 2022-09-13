import logoPicture from "./image/logo192.png";
import Tasks from "./Components/Tasks";
import React, { useState, useEffect, SetStateAction } from "react";
import { nanoid } from "nanoid";

interface Task {
  readonly id: string;
  body: string;
  completed: boolean;
  key: string;
}

const App: React.FC = () => {
  const [taskArray, setTaskArray] = useState<Task[]>(
    () => JSON.parse(localStorage.getItem("tasks") || "") || []
  );

  const [taskInputValue, setTaskInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  }, [taskArray]);

  function handleChangeInputTask(event: {
    target: { value: SetStateAction<string> };
  }) {
    if (event.target.value.length < 100) setTaskInputValue(event.target.value);
  }

  function createNewTask(taskText: string) {
    if (taskText.length < 1) return;
    const tempId = nanoid();
    const newTask = {
      id: tempId,
      body: taskText,
      completed: false,
      key: tempId,
    };

    console.log(newTask);

    setTaskArray((prev: Task[]) => [newTask, ...prev]);
    setTaskInputValue("");
  }

  function changeTaskState(id: string, body: string) {
    setTaskArray((oldTasks: Task[]) => {
      // let thatTask = oldTasks.find((task: Task) => task.id === id);
      // thatTask!.completed = !thatTask!.completed;
      // return oldTasks.map((single) => single);
      const newArray = [];
      for (let i = 0; i < oldTasks.length; i++) {
        const oldTask = taskArray[i];

        if (oldTask.id === id) {
          if (body === undefined)
            newArray.push({ ...oldTask, completed: !oldTask.completed });
          else newArray.push({ ...oldTask, body: body });
        } else {
          newArray.push(oldTask);
        }
      }
      return newArray;
    });
  }

  function deleteTask(id: string) {
    setTaskArray((oldTasks: Task[]) =>
      oldTasks.filter((singleTask) => singleTask.id !== id)
    );
  }

  const tasksToRender = taskArray.map((singleTask: Task) => (
    <>
      <Tasks
        deleteTask={deleteTask}
        changeTaskState={changeTaskState}
        task={singleTask}
        key={singleTask.id}
      />
    </>
  ));

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
        {taskArray.length > 0 && (
          <div className="container-tasks">
            <h2>Task list:</h2>
            <ul>{tasksToRender}</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
