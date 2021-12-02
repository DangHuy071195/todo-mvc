class TodoModel {
  constructor(todoText, status) {
    this.title = todoText
    this.status = status
    this.id = new Date().toISOString()
  }
}

export default TodoModel
