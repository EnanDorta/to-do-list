import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}


export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const uniqueId = uuidv4()
  console.log(tasks)

  function handleCreateNewTask() {
    // Cria uma nova task com um id random, não permite criar caso o título seja vazio.
    if (newTaskTitle === "") return
    const newTask = {
      id: uniqueId,
      title: newTaskTitle,
      isComplete: false,
    }
    setNewTaskTitle('')
    setTasks([...tasks, newTask])
  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const taskChange = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    }: task)
    setTasks(taskChange)
  }

  function handleRemoveTask(id: string) {
    // Remove uma task da listagem pelo ID
    const filterTasks = tasks.filter(task => task.id  !== id);
    setTasks(filterTasks)
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
          {/* Da um map em tasks, e renderiza em tela uma task*/}
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