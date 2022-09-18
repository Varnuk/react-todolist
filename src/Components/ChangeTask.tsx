import { TaskChangeProps } from "./../types/types";

const ChangeTask = (props: TaskChangeProps) => {
  function handleEditTask(event: { key: string }) {
    if (event.key === "Enter") {
      props.setIsEdit(false);
      props.changeTaskBody(props.id, props.editValue);
    }
  }
  return (
    <input
      className="task-change-edit"
      type="text"
      placeholder="Edit your task here..."
      value={props.editValue}
      onChange={(event) => props.setEditValue(event?.target.value)}
      onKeyPress={handleEditTask}
    />
  );
};

export default ChangeTask;
