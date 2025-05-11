import { createBrowserRouter, RouterProvider } from 'react-router';
import OnlineUserProtectedRoute from './components/routing components/OnlineUserProtectedRoute';
import Login from './screens/login-and-register/login/Login';
import Register from './screens/login-and-register/login/register/Register';
import UserLists from './screens/user-lists/UserLists';
import { createContext, useState } from 'react';

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
    path: '/:userId/lists',
    Component: UserLists // You'll need to create this component
  }
  // {
  //   path: 'todos',
  //   Component: TodosTable
  // }
]);

interface UserContextType {
  userId: number | null;
  login: (newUserId: number) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  userId: null,
  login: () => {},
  logout: () => {}
});

function App() {
  const [userId, setUserId] = useState<number | null>(null);

  function login(id: number) {
    return setUserId(id);
  }

  function logout() {
    return setUserId(null);
  }

  return (
    <UserContext.Provider value={{ userId, login, logout }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
