import { useState } from 'react'
import './AddTask.css'

export default function AddTask({ onAdd }) {
  const [text, setText] = useState('')
  const [date, setDate] = useState('Сегодня')

  function handleAdd() {
    if (text.trim() === '') return

    onAdd({ text1: text, date })
    setText('')
    setDate('Сегодня')
  }

  return (
    <div className='tasks'>
      <input
        type="text"
        placeholder='Купить молоко'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <section>
        <p>Выполнить задачу: </p>
        <select value={date} onChange={e => setDate(e.target.value)}>
          <option>Сегодня</option>
          <option>Завтра</option>
        </select>
      </section>
      <button onClick={handleAdd}>Добавить!</button>
    </div>
  )
}