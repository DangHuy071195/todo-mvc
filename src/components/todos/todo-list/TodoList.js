import React, {useState} from 'react'
import Footer from '../footer/FooterTodo'
import Header from '../header/HeaderTodo'
import TodoItem from '../todo-item/TodoItem'

import './todo-list.style.scss'
import TodoModel from '../../data/TodoModel'
import {useLocation} from 'react-router'

const Todo = ({filter}) => {
  const location = useLocation()
  const splitLocation = location.pathname.split('/')

  const [todos, setTodos] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [isToggleAll, setIsToggleAll] = useState(false)
  const [showTodoList, setShowTodoList] = useState(true)
  const handleOnChange = () => {
    setIsChecked(!isChecked)
    setIsToggleAll(true)
    const newTodos = todos.map((item, idx) => {
      return {...item, status: !isChecked}
    })

    setTodos(newTodos)
  }

  const addNewTodoHandler = (todoText) => {
    const newTodo = new TodoModel(todoText, false)
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  const todosRender =
    filter === 'active'
      ? todos.filter((item) => item.status === false)
      : filter === 'completed'
      ? todos.filter((item) => item.status === true)
      : todos
  return (
    <div className='todo'>
      <Header
        todos={todos}
        addTodo={addNewTodoHandler}
        showTodoList={showTodoList}
        toggleShowTodo={setShowTodoList}
      />
      {todosRender.length > 0 && (
        <div className='todo-body'>
          {showTodoList && (
            <ul className='todo-list'>
              {splitLocation[1] === '' && (
                <input
                  id='toggle-all'
                  type='checkbox'
                  checked={isChecked}
                  onChange={handleOnChange}
                />
              )}

              {todosRender.map(({title, status, id}, idx) => (
                <TodoItem
                  todos={todos}
                  key={idx}
                  index={idx}
                  id={id}
                  title={title}
                  isChecked={isChecked}
                  updateTodos={setTodos}
                  status={status}
                  handleToggle={setIsToggleAll}
                  isToggleAll={isToggleAll}
                />
              ))}
            </ul>
          )}
        </div>
      )}
      <Footer
        todos={todos}
        updateTodos={setTodos}
        toggleShowTodo={setShowTodoList}
      />
    </div>
  )
}

export default Todo
