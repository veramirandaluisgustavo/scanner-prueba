import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
//import Scanner from './components/scanner.tsx'
import App from './App.tsx'



const router = createBrowserRouter([
  {
    path: "/:id",
    element: <App/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  
  
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
  
  
)
