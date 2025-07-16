import { useState, useEffect } from 'react' 
import './App.css'
import Header from './components/Header/Header'
import Aside from './components/Aside/Aside'
import Image from './components/Image/Image'
import AddTask from './components/AddTask/AddTask'
import pen from '/pen.svg'
import change from '/change.svg'

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [viewDone, setViewDone] = useState(false)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  function handleAddTask(task) {
    const newTask = {
      ...task,
      done: false,
      id: Date.now() + Math.random()
    }
    setTasks(prev => [...prev, newTask])
    setShowAddForm(false)
  }

  function updateTask(id, newText, newDate) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, text1: newText, date: newDate } : task
      )
    )
    setEditingId(null)
  }

  function markTaskDone(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: true } : task
      )
    )
  }

  function restoreTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: false } : task
      )
    )
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => task.done === viewDone)

  const shouldShowImage = !showAddForm && !viewDone && filteredTasks.length === 0

  return (
    <>
      <div className='header'>
        <Header />
        <h1 className='timer'>Текущее время: {time.toLocaleTimeString()}</h1>
      </div>

      <div className='aside'>
        <Aside
          onShowAddTask={() => {
            setShowAddForm(prev => !prev)
            setEditingId(null)
          }}
          onShowDone={() => {
            setViewDone(true)
            setShowAddForm(false)
            setEditingId(null)
          }}
          onShowAll={() => {
            setViewDone(false)
            setShowAddForm(false)
            setEditingId(null)
          }}
          isAdding={showAddForm}
        />

        <div className='image'>
          {showAddForm ? (
            <AddTask onAdd={handleAddTask} />
          ) : shouldShowImage ? (
            <Image />
          ) : (
            <ul>
              {filteredTasks.map(task => (
               <li key={task.id} className='taskname'>
  {editingId === task.id ? (
    <form onSubmit={e => {
      e.preventDefault()
      const newText = e.target.text.value
      const newDate = e.target.date.value
      updateTask(task.id, newText, newDate)
    }}>
      <input name="text" defaultValue={task.text1} />
      <select name="date" defaultValue={task.date}>
        <option>Сегодня</option>
        <option>Завтра</option>
      </select>
      <button type="submit">Сохранить</button>
    </form>
  ) : (
    <>
      <div className="task-content">
        <span>{task.text1} ({task.date})</span>
      </div>
      <div className='icons'>
        {!task.done && (
          <>
            <img src={change} onClick={() => setEditingId(task.id)} />
            <img src={pen} onClick={() => markTaskDone(task.id)} />
          </>
        )}
        {task.done && (
          <>
            <button className="task-btn" onClick={() => restoreTask(task.id)}>Вернуть</button>
            <button className="task-btn" onClick={() => deleteTask(task.id)}>Удалить</button>
          </>
        )}
      </div>
    </>
  )}
</li>
           ))}
         </ul>
         )}
       </div>
      </div>
    </>
  )
}