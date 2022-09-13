interface Props {
  editValue: string;
  setEditValue: React.Dispatch<React.SetStateAction<string>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  changeTaskState(id: string, body?: string): void;
  id: string;
}

const ChangeTask = (props: Props) => {
  function handleEditTask(event: { key: string }) {
    if (event.key === "Enter") {
      props.setIsEdit(false);
      props.changeTaskState(props.id, props.editValue);
    }
  }
  return (
    <input
      className="task--edit"
      type="text"
      placeholder="Edit your task here..."
      value={props.editValue}
      onChange={(event) => props.setEditValue(event?.target.value)}
      onKeyPress={handleEditTask}
    />
  );
};

export default ChangeTask;
