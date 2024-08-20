import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {  BrowserRouter} from 'react-router-dom'
//import Scanner from './components/scanner.tsx'
import {App2} from './App2.tsx'




ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <BrowserRouter>
  <React.StrictMode>
    <App2></App2>
    
  </React.StrictMode>
  </BrowserRouter>
  
  
)
