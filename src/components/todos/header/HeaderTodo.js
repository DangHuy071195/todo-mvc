import React, {useState} from 'react'
import {useLocation} from 'react-router'

import './header.style.scss'

const HeaderTodo = ({showTodoList, addTodo, toggleShowTodo}) => {
  const location = useLocation()
  const {pathname} = location
  const splitLocation = pathname.split('/')

  const [todoText, setTodoText] = useState('')

  const inputHandler = (e) => {
    setTodoText(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    addTodo(todoText)
  }

  const toggleTodoList = () => {
    toggleShowTodo(!showTodoList)
  }
  return (
    <div className='header'>
      <h1>todos</h1>
      <form className='header-todo' onSubmit={submitHandler}>
        <label
          htmlFor='toggle-all'
          onClick={splitLocation[1] !== '' ? toggleTodoList : null}
        ></label>
        <input
          type='text'
          placeholder='What needs to be done?'
          onChange={(e) => inputHandler(e)}
        />
      </form>
    </div>
  )
}

export default HeaderTodo
