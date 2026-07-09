import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp' 
import Home from './pages/home/Home'
import {store} from './store/store.js'
import {Provider} from 'react-redux'
import PublicRoutes from './components/PublicRoutes'
import ProtectedRoute from './components/ProtectedRoutes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Home/></ProtectedRoute>
  },

  {
    path: '/login',
    element: <PublicRoutes><Login/></PublicRoutes>
  },

  {
    path: '/signup',
    element: <PublicRoutes><SignUp/></PublicRoutes>
  }
])


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={router} />
    <App/ >
  </Provider>
)
    
