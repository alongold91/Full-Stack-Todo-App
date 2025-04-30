import { useEffect } from 'react'
import TodosTable from './screens/todos-table/TodosTable'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
]);

function App() {
  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(response => response.json())  // Parse the JSON response
      .then(userData => {
        console.log(userData)  // This will log the actual user data
      })
      .catch(error => {
        console.error("Error fetching users:", error)
      })
  }, [])

  return (
    <div>
      <TodosTable />
    </div>
  )
}

export default App
