import { useState } from "react";
import ChangeTask from "./ChangeTask";
import { TaskProps } from "./../types/types";
import "./../Styles/task.css";

const Tasks = (props: TaskProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(props.task.body);

  function handleChangeInputEdit() {
    if (isEdit) {
      setEditValue(props.task.body);
      setIsEdit(false);
    } else setIsEdit(true);
  }

  function handleOnEdit() {
    props.changeTaskBody(props.task.id, editValue);
    setIsEdit(false);
  }

  return (
    <>
      <li
        className={
          isEdit
            ? "single-task-edit"
            : props.task.completed
            ? "single-task complete"
            : "single-task"
        }
      >
        {isEdit ? (
          <ChangeTask
            editValue={editValue}
            setEditValue={setEditValue}
            setIsEdit={setIsEdit}
            changeTaskState={props.changeTaskState}
            changeTaskBody={props.changeTaskBody}
            id={props.task.id}
          />
        ) : (
          props.task.body
        )}
        <div className="task-control">
          <button
            onClick={() =>
              isEdit ? handleOnEdit() : props.changeTaskState(props.task.id)
            }
            className="task-accept"
          >
            <span>&#10004;</span>
          </button>
          {!isEdit && (
            <button onClick={handleChangeInputEdit} className="task-edit">
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
