import { useState } from "react";
import ChangeTask from "./ChangeTask";
import { nanoid } from "nanoid";

interface Task {
  readonly id: string;
  body: string;
  completed: boolean;
}

interface Props {
  deleteTask(id: string): void;
  changeTaskState(id: string, body?: string): void;
  task: Task;
}

const Tasks = (props: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(props.task.body);

  function handleChange() {
    if (isEdit) {
      setEditValue(props.task.body);
      setIsEdit(false);
    } else setIsEdit(true);
  }

  return (
    <>
      <li
        style={{
          textDecoration: props.task.completed ? "line-through" : "none",
        }}
        className="single-task"
      >
        {isEdit ? (
          <>
            <ChangeTask
              editValue={editValue}
              setEditValue={setEditValue}
              setIsEdit={setIsEdit}
              changeTaskState={props.changeTaskState}
              id={props.task.id}
              key={props.task.id}
            />
            <div className="task--control"></div>
          </>
        ) : (
          props.task.body
        )}
        <div className="task--control">
          <button
            onClick={() => props.changeTaskState(props.task.id)}
            className="task-accept"
          >
            <span>&#10004;</span>
          </button>
          {!isEdit && (
            <button onClick={handleChange} className="task-edit">
              <span>&#9998;</span>
            </button>
          )}
          <button
            onClick={() => props.deleteTask(props.task.id)}
            className="task-remove"
          >
            <span>&#10006;</span>
          </button>
        </div>
      </li>
    </>
  );
};

export default Tasks;
