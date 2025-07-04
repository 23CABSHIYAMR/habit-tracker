import React from 'react'
import AppLayout from './layouts/AppLayout/AppLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WeekPage from './pages/WeekPage'
import MonthPage from './pages/MonthPage'
import YearPage from './pages/YearPage'
import AllTimePage from './pages/AllTimePage'

const App=()=> {
  const router=createBrowserRouter([
    {
      path:'/'
      ,element:<AppLayout/>,
      errorElement:<WeekPage/>
      ,children:[
        {
          index:true,
          element:<WeekPage/>
        },
        {
          path:'Month',
          element:<MonthPage/>
        },
        {
          path:'Year',
          element:<YearPage/>
        },
        {
          path:'All-Time',
          element:<AllTimePage/>
        },
      ]
    }
  ])
  return <RouterProvider router={router}/>
}
export default App;