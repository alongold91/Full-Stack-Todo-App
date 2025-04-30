import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Login from './screens/login-and-register/login/Login.tsx';
import './index.css';
import Register from './screens/login-and-register/login/register/Register.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: () => <ProtectedRoute condition={true} alternativeRoute='/login'>
      <App />
    </ProtectedRoute>
  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/register',
    Component: Register
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
