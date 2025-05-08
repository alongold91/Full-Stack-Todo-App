import { createBrowserRouter, RouterProvider } from 'react-router';
import OnlineUserProtectedRoute from './components/routing components/OnlineUserProtectedRoute';
import Login from './screens/login-and-register/login/Login';
import Register from './screens/login-and-register/login/register/Register';
import TodosTable from './screens/todos-table/TodosTable';

const router = createBrowserRouter([
  {
    path: '/',
    Component: OnlineUserProtectedRoute
  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/register',
    Component: Register
  },
  {
    path: 'todos',
    Component: TodosTable
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
