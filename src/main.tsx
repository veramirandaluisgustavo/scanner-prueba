import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
//import Scanner from './components/scanner.tsx'
import App from './App.tsx'




ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <BrowserRouter>
  <React.StrictMode>
    <div>esto si se esta renderizando</div>
    <Routes>
      <Route path='/:id' element={<App></App>}></Route>
      <Route path='/' element={<div>hola mundo</div>}></Route>
    </Routes>
  </React.StrictMode>
  </BrowserRouter>
  
  
)
