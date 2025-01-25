import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { database, ref, set, onValue, remove, update } from "../firebase";
import "../task.css";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState(""); // State for task name input
  const [taskDescription, setTaskDescription] = useState(""); // State for task description input

  // Fetch tasks from Firebase
  useEffect(() => {
    const taskRef = ref(database, "tasks/");
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      const taskList = data
        ? Object.entries(data).map(([id, task]) => ({ id, ...task }))
        : [];
      setTasks(taskList);
    });
  }, []);

  // Add a new task
  const addTask = () => {
    if (taskName.trim() === "" || taskDescription.trim() === "") {
      alert("Please enter both task name and description");
      return;
    }

    const taskId = Date.now().toString();
    const newTask = {
      name: taskName,
      description: taskDescription,
      status: "Pending",
    };
    set(ref(database, `tasks/${taskId}`), newTask);
    setTaskName(""); // Reset input field after submitting
    setTaskDescription(""); // Reset input field after submitting
  };

  // Delete a task
  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      remove(ref(database, `tasks/${id}`));
    }
  };

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return; // Dragged outside

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return; // No change
    }

    const updatedTask = tasks.find((task) => task.id === draggableId);
    if (updatedTask) {
      update(ref(database, `tasks/${draggableId}`), {
        status: destination.droppableId,
      });
    }
  };

  // Filter tasks by status
  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="task-management">
      <h1>Task Create</h1>

      {/* Input fields to add a new task */}
      <div className="add-task-form">
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {["Pending", "Completed", "Done"].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{status}</h2>
                  {getTasksByStatus(status).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          className="task"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h3>{task.name}</h3>
                          <p>{task.description}</p>
                          <button
                            className="delete-button"
                            onClick={() => deleteTask(task.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskManagement;
