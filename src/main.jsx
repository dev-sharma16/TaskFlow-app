import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import Dashboard from './pages/DashBoard.jsx'
import AddTasks from './pages/AddTask.jsx'
import Login from "./pages/Login.jsx"
import SignUp from './pages/SignUp.jsx'
import { AuthLayout } from './components/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path : "/login",
        element: (
          <AuthLayout authentication = {false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path : "/signup",
        element: (
          <AuthLayout authentication = {false}>
            <SignUp/>
          </AuthLayout>
        )
      },
      {
        path : "/dashboard",
        element: (
          <AuthLayout authentication = {true}>
            <Dashboard/>
          </AuthLayout>
        )
      },
      {
        path : "/add-task",
        element: (
          <AuthLayout authentication = {true}>
            <AddTasks/>
          </AuthLayout>
        )
      },

    ]
  }
])
  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
      <RouterProvider router ={router}/>
    </Provider>
  </StrictMode>,
)
