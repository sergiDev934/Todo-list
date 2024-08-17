import { useState } from 'react'
import './App.css'

export default function App () {
  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState([])

  const updateTextInput = e => {
    setTitle(e.target.value)
  }

  const submitNewTask = e => {
    if (title !== '') {
      e.preventDefault()
      const newTask = {
        id: Date.now(),
        title
      }

      setTasks([...tasks, newTask])

      setTitle('')
    }
  }
  const handleDelete = id => {
    const newTasks = tasks.filter(task => task.id !== id)
    console.log(newTasks)
  }

  const onUpdate = () => {
  }

  const TaskContainer = ({ task, title, onDeleteTask, onEditTask, onUpdate }) => {
    const [edit, setEdit] = useState(false)

    const handleUpdate = () => {
      setEdit(!edit)
    }
    const handleDelete = e => {
      onDeleteTask(task.id)
    }

    return (
      edit
        ? (
          <form className='taskContainer'>
            <input type='text' value={title} />
            <button onClick={() => handleUpdate()} className='taskContainer__btn edit'>Update</button>
          </form>
          )
        : (
          <div className='taskContainer'>
            <span>{title}</span>
            <button onClick={() => setEdit(!edit)} className='taskContainer__btn edit'>Edit</button>
            <button onClick={e => handleDelete(e)} className='taskContainer__btn delete'>Delete</button>
          </div>
          )
    )
  }

  return (
    <main>
      <h1>Todo List App</h1>
      <form className='form' onSubmit={submitNewTask}>
        <input type='text' className='input' onChange={updateTextInput} value={title} />
        <input type='Submit' className='button' value='Create Task' />
      </form>
      <section className='todoContainer'>
        {
          tasks.map((task) => {
            const id = task.id
            return (
              <TaskContainer
                key={id}
                task={task}
                title={task.title}
                onDeleteTask={handleDelete}
                // TODO: PONER BIEN LAS FUNCIONES
                onEditTask
                onUpdate
              />
            )
          })
        }
      </section>
    </main>
  )
}
