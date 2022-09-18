export interface TaskChangeProps {
  editValue: string;
  setEditValue: React.Dispatch<React.SetStateAction<string>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  changeTaskState(id: string): void;
  changeTaskBody(id: string, body?: string): void;
  id: string;
}

export interface Task {
  readonly id: string;
  body: string;
  completed: boolean;
}

export interface TaskProps {
  deleteTask(id: string): void;
  changeTaskState(id: string): void;
  changeTaskBody(id: string, body?: string): void;
  task: Task;
}
