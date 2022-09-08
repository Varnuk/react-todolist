import React from "react";

const Tasks = (props) => {
  const toRender = props.taskArray.map((task) => {
    const styles = {
      textDecoration: task.completed ? "none" : "line-through",
    };

    return (
      <li style={styles} key={task.id} className="single-task">
        {task.body}
        <div className="task--control">
          <button
            onClick={() => props.changeTaskState(task.id)}
            className="task-accept"
          >
            <span>&#10004;</span>
          </button>
          <button className="task-edit">
            <span>&#9998;</span>
          </button>
          <button
            onClick={() => props.deleteTask(task.id)}
            className="task-remove"
          >
            <span>&#10006;</span>
          </button>
        </div>
      </li>
    );
  });

  return <ul>{toRender}</ul>;
};

export default Tasks;
