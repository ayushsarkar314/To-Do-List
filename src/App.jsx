import { useState } from 'react'
import { Todocontextprovider } from './context/Todocontext'
import { useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'



function App() {
  const [todosarray, settodosarray] = useState([])

  const addTodo = (todo) => {
    settodosarray((prevArray) => [{ id : Date.now() , ...todo }, ...prevArray])
  }

  const removeTodo = (id) => {
     settodosarray((prevArray) =>  prevArray.filter((todo) => todo.id !== id ))
  }

  const updateTodo = (id, todo) => {
    settodosarray((prevArray) => prevArray.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo)))
  }

  const toggleChecker = (id) => {
      settodosarray((prevArray) =>  prevArray.map((todo) => todo.id === id ? {...todo, checked : !todo.checked} : todo ))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0)  settodosarray(todos)
  },[])

  useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(todosarray))
  }, [todosarray])

  return (
    <Todocontextprovider value={{todosarray,addTodo,removeTodo,updateTodo,toggleChecker}} >
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        < TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todosarray.map((todo) => (
                          <div key={todo.id} className='w-full'>
                             < TodoItem todo ={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </Todocontextprovider>
  )
}

export default App
