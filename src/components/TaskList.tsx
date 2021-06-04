import { useState } from 'react'
import {v4 as uuidv4} from 'uuid';

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
  
  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
   
    if (newTaskTitle !== ""){
         const newTask:Task = {
          id: uuidv4(),
          title: newTaskTitle ,
          isComplete:false
         }
        //  console.log(newTask);
         setTasks([...tasks,newTask])
          
        
      }
  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    //pega todos os itens e armazena para consulta
    const updateTask: Task[] = [...tasks]
    
    updateTask.find((task:Task)=> task.id === id)!.isComplete = 
    !updateTask.find((task:Task)=> task.id === id)!.isComplete

    // console.log(updateTask);

    setTasks(updateTask)
  }

  function handleRemoveTask(id: string) {
    // Remova uma task da listagem pelo ID
    const deleteTask : Task[] = tasks.filter((task:Task)=> task.id !==id)

    // console.log(deleteTask);

    setTasks(deleteTask)
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