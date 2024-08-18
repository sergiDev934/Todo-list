import { useState } from 'react'
import './App.css'

export default function App () {
  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState([])

  const updateTextInput = e => {
    setTitle(e.target.value)
  }

  const submitNewTask = e => {
    e.preventDefault()

    if (title !== '') {
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
    setTasks(newTasks)
  }
  const handleUpdate = (id, newTitle) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.title = newTitle
      }
      return task
    })
    setTasks(newTasks)
  }

  const TaskContainer = ({ task, title, onDeleteTask, onUpdateTask }) => {
    const [edit, setEdit] = useState(false)
    const [titleInside, setTitleInside] = useState(title)

    const onHandleDelete = () => {
      onDeleteTask(task.id)
    }
    const onHandleUpdate = () => {
      onUpdateTask(task.id, titleInside)
      setEdit(!edit)
    }

    return (
      edit
        ? (
          <div className='taskContainer'>
            <input type='text' defaultValue={titleInside} onInput={e => setTitleInside(e.target.value)} />
            <input type='Submit' onClick={() => onHandleUpdate()} className='taskContainer__btn edit' defaultValue='Update' />
          </div>
          )
        : (
          <div className='taskContainer'>
            <span>{titleInside}</span>
            <button onClick={() => setEdit(!edit)} className='taskContainer__btn edit'>Edit</button>
            <button onClick={e => onHandleDelete()} className='taskContainer__btn delete'>Delete</button>
          </div>
          )
    )
  }

  return (
    <main>
      <h1>Todo List App</h1>
      <form className='form' onSubmit={submitNewTask}>
        <input type='text' className='input' onChange={updateTextInput} value={title} />
        <input type='Submit' className='button' defaultValue='Create Task' />
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
                onUpdateTask={handleUpdate}
              />
            )
          })
        }
      </section>
    </main>
  )
}
