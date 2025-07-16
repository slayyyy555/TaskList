import './Aside.css'
import plus from '/plus.svg'
import check from '/check.svg'
import list from '/list.svg'

export default function Aside({ onShowAddTask, onShowDone, onShowAll, isAdding }) {
  return (
    <div className="list">
      <h3>Мои задачи:</h3>
      <ul>
        <img src={check} className='check' />
        <li className='now' onClick={onShowAll}>Задачи</li>

        <img src={plus} className='plus' />
        <li className='now' onClick={onShowAddTask}>
          {isAdding ? 'Скрыть форму' : 'Добавить задачу'}
        </li>

        <img src={list} className='done' />
        <li className='now' onClick={onShowDone}>Выполнено</li>
      </ul>
    </div>
  )
}