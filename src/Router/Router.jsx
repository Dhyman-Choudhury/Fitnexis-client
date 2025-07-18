import { createBrowserRouter } from "react-router";
import Root from "../RootLayout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthLayout from "../layouts/AuthLayouts";
import Register from "../pages/Authentication/Register/Register";
import Login from "../pages/Authentication/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
          index:true,
          Component:Home  

        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
    
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'login',
        Component: Login
      }
    ]
  },
  {
  path: '/dashboard',
  Component: DashboardLayout,
  children: [
    {
      index: true,
      element: <div>Dashboard Home</div>
    },
    {
      path: 'profile',
      element: <div>Profile Page</div>
    },
    {
      path: 'settings',
      element: <div>Settings Page</div>
    }
  ]
}
]);