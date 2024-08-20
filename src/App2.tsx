
import App from './App.tsx'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "scanner-prueba/:id",
    element: <App/>,
  },
]);
export function App2() {
return(<RouterProvider router={router}></RouterProvider>)
    

}