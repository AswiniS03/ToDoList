import React, { useState } from 'react';
import './todolist.css';

function TodoList() {
    const [tasks, setTasks] = useState([
        { text: "Eat", completed: false },
        { text: "Sleep", completed: false },
        { text: "Walk", completed: false }
    ]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(prevTasks => [...prevTasks, { text: newTask, completed: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleTaskCompletion(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    }
    const total=tasks.length;
    const comp=tasks.filter(task=>task.completed).length;
    const rem=total-comp;

    return (
        <body>
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div className="report">
            <p>Total tasks {total}</p>
            <p>Completed task {comp}</p>
            <p>Remaining task {rem}</p>
            </div>
            <div>
                <input type="text" placeholder="Enter the new task to add" value={newTask} onChange={handleInputChange} />
                <button className="add" onClick={addTask}>Add Task</button>
            </div>
            <ol> 
                {tasks.map((task, index) =>
                    <li key={index} className='ord'>
                        <span className={task.completed ? "completed" : ""}>{task.text}</span>
                        <button className="delete" onClick={() => deleteTask(index)}>
                            Delete task
                        </button>
                        <button className="up" onClick={() => moveTaskUp(index)}>
                            Move Up task
                        </button>
                        <button className="down" onClick={() => moveTaskDown(index)}>
                            Move Down task
                        </button>
                        
                        <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(index)}  />
                        
                        
                    </li>
                )}
            </ol>
        </div>
        </body>
    );
}

export default TodoList;
