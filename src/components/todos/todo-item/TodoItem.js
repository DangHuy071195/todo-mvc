import React, {useEffect, useRef, useState} from 'react'
import {useLocation} from 'react-router'

import './todo-item.style.scss'

const TodoItem = ({
  id,
  title,
  index,
  todos,
  status,
  isChecked,
  updateTodos,
  handleToggle,
  isToggleAll,
}) => {
  const [isShownClose, setIsShownClose] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [titleTodo, setTitleTodo] = useState(title)
  const todoItemRef = useRef(null)

  const location = useLocation()
  const pathLocation = location.pathname.split('/')[1]
  let checkedFirstTime = {}

  todos.forEach((item) => {
    checkedFirstTime = {...checkedFirstTime, [item.id]: item.status}
  })
  const [checkedState, setCheckedState] = useState(checkedFirstTime)

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setEditMode(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  useOutsideAlerter(todoItemRef)

  const handleOnChange = (id) => {
    handleToggle(false)

    const updatedTodos = todos.map((item, idx) => {
      if (id === item.id) {
        return {...item, status: !item.status}
      }
      return item
    })
    updateTodos(updatedTodos)
    let checkedStateInitial = {}

    updatedTodos.forEach((item) => {
      checkedStateInitial = {...checkedStateInitial, [item.id]: item.status}
    })
    setCheckedState(checkedStateInitial)
  }
  const inputEditOnchange = (e) => {
    setTitleTodo(e.target.value)
  }

  const editSubmitHandler = (e) => {
    e.preventDefault()
    const updatedTodos = todos.map((item) =>
      item.id === id ? {...item, title: titleTodo} : item
    )
    updateTodos(updatedTodos)
    setEditMode(false)
  }
  const toggleEditMode = () => {
    setEditMode(true)
  }

  const removeHandler = () => {
    const updatedTodos = todos.filter((item) => item.id !== id)
    updateTodos(updatedTodos)
  }

  return (
    <li
      className='todo-item'
      ref={todoItemRef}
      onMouseEnter={() => setIsShownClose(true)}
      onMouseLeave={() => setIsShownClose(false)}
    >
      <div className={`staticmode ${editMode ? 'hidden' : ''}`}>
        <input
          type='checkbox'
          checked={
            isToggleAll && pathLocation === ''
              ? isChecked
              : status
              ? status
              : false
          }
          onChange={() => handleOnChange(id)}
          id={`checkbox-${index}`}
        />
        <label htmlFor={`checkbox-${index}`}></label>
        <span onClick={toggleEditMode}>{title}</span>
      </div>
      {editMode && (
        <form onSubmit={editSubmitHandler}>
          <input
            type='text'
            value={titleTodo}
            onChange={(e) => inputEditOnchange(e)}
          />
        </form>
      )}
      {isShownClose && !editMode && (
        <input
          className='close'
          type='button'
          value='x'
          onClick={removeHandler}
        />
      )}
    </li>
  )
}

export default TodoItem
