import { useState } from 'react'

import '../styles/tasklist.scss'
import { v4 as uuidv4 } from 'uuid'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('')

  function handleCreateNewTask() {
    if (!!newTaskTitle){
      setTasks([...tasks, {id: uuidv4(), title: newTaskTitle, isComplete: false}])}
  }

  function handleToggleTaskCompletion(id: number) {
    let newTasks = [...tasks]
    const toggleTask = newTasks.find((task)=>(task.id === id));
    if (!!toggleTask){
      const task = {id, title: toggleTask.title, isComplete: !toggleTask.isComplete }
      const index = newTasks.indexOf(toggleTask)
      console.log(index)
      if (index > -1) {
        newTasks.splice(index, 1)
        newTasks.push(task)
      }
      setTasks(newTasks)
    }}

  function handleRemoveTask(id: number) {
    let newTasks = [...tasks]
    const taskToRemove = tasks.find((task)=>(task.id === id))
    if(!!taskToRemove){
      const index = newTasks.indexOf(taskToRemove)
      if (index > -1) {
        newTasks.splice(index, 1)
      }
      setTasks(newTasks)
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}