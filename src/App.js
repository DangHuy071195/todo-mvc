import './App.css'
import {Routes, Route} from 'react-router-dom'
import Todo from './components/todos/todo-list/TodoList'

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Todo filter='all' />} />
        <Route exact path='/active' element={<Todo filter='active' />} />
        <Route exact path='/completed' element={<Todo filter='completed' />} />
      </Routes>
    </div>
  )
}

export default App
