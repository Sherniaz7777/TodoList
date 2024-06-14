import React, { useState } from "react";
import "./Home.css"; 

const Home = () => {
  const [tasks, setTasks] = useState([
    { id: 24, name: "Buy Grocery", status: "Todo" },
    { id: 25, name: "Send Email", status: "In Progress" },
    { id: 28, name: "Finish Assignment", status: "Complete" },
    { id: 30, name: "Bake Cake", status: "Todo" },
    { id: 31, name: "Write Blog Post", status: "In Progress" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      name: newTask,
      status: "Todo",
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const handleStatusChange = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const newStatus =
          task.status === "Todo"
            ? "In Progress"
            : task.status === "In Progress"
            ? "Complete"
            : "Todo";
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEdit = (id, name) => {
    setEditTaskId(id);
    setEditTaskName(name);
    setNewTask(name);
  };

  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editTaskId ? { ...task, name: editTaskName } : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditTaskName("");
    setNewTask("");
  };

  return (
    <div className="todo-list">
      <h1>TODO List Demo App</h1>
      <input
        type="text"
        value={editTaskId ? editTaskName : newTask}
        onChange={(e) => editTaskId ? setEditTaskName(e.target.value) : setNewTask(e.target.value)}
        placeholder="New task"
      />
      <button onClick={editTaskId ? handleSaveEdit : handleAddTask}>
        {editTaskId ? "Save Edit" : "Add Task"}
      </button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Task Name</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>

                  {task.name}
                
              </td>
              <td>
                <button
                  className={`status-btn ${task.status.toLowerCase()}`}
                  onClick={() => handleStatusChange(task.id)}
                >
                  {task.status}
                </button>
              </td>
              <td>
                {editTaskId === task.id ? (
                  <button className="save-btn" onClick={handleSaveEdit}>
                    Save
                  </button>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(task.id, task.name)}
                  >
                    ✏️
                  </button>
                )}
              </td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveTask(task.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
