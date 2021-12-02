import React from 'react'
import {useLocation} from 'react-router-dom'

import {Link} from 'react-router-dom'

import './filter.style.scss'
const Filter = ({todos, updateTodos, toggleShowTodo}) => {
  const completedTodosCount = todos.filter(
    (item) => item.status === true
  ).length
  const location = useLocation()
  const {pathname} = location
  const splitLocation = pathname.split('/')

  const clearTodoCompeletedHandler = () => {
    toggleShowTodo(true)
    const newTodoList = todos.filter((item) => item.status === false)
    updateTodos(newTodoList)
  }
  return (
    <ul className='filters'>
      <li className={`filters-item ${splitLocation[1] === '' ? 'active' : ''}`}>
        <Link to='/'>All</Link>
      </li>
      <li
        className={`filters-item ${
          splitLocation[1] === 'active' ? 'active' : ''
        }`}
      >
        <Link to='/active' onClick={() => toggleShowTodo(true)}>
          Active
        </Link>
      </li>
      <li
        className={`filters-item ${
          splitLocation[1] === 'completed' ? 'active' : ''
        }`}
      >
        <Link to='/completed' onClick={() => toggleShowTodo(true)}>
          Completed
        </Link>
      </li>
      {completedTodosCount >= 1 && (
        <li className={`filters-item`}>
          <Link to='/' onClick={clearTodoCompeletedHandler}>
            Clear Completed
          </Link>
        </li>
      )}
    </ul>
  )
}

export default Filter
