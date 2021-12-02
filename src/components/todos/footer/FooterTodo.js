import React from 'react'
import Filter from './filter/Filter'
import './footer.style.scss'

const FooterTodo = ({todos, updateTodos, toggleShowTodo}) => {
  const itemsLeftCount = todos.filter((item) => !item.status).length
  return (
    <footer>
      <span className='todo-count-left'>{itemsLeftCount} items left</span>
      <Filter
        todos={todos}
        updateTodos={updateTodos}
        toggleShowTodo={toggleShowTodo}
      />
    </footer>
  )
}

export default FooterTodo
