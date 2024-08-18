import { useState } from 'react'

export function TaskContainer ({ task, title, onDeleteTask, onUpdateTask }) {
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
