import { useState } from 'react'
import { TaskContainer } from '../components/TaskContainer'
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
