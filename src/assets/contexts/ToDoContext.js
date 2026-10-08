import { createContext, useContext } from 'react'

export const ToDoContext = createContext({
    todos: [],
    addToDO: () => {},
    updateToDo: () => {},
    deleteToDo: () => {},
    ToggleToDo: () => {}
})

export const useToDo = () => useContext(ToDoContext)

export const TodoProvider = ToDoContext.Provider