import { useEffect, useState } from 'react'
import { TodoProvider } from './assets/contexts'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos, setTodos] = useState([])

  const addToDO = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo, completed: Boolean(todo.completed) }])
  }

  const updateToDo = (id, value) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, todo: value } : todo)))
  }

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const ToggleToDo = (id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  useEffect(() => {
    try {
      const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]')
      setTodos(storedTodos)
    } catch {
      setTodos([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addToDO, updateToDo, deleteToDo, ToggleToDo }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
