
import App from './App.tsx'

import {   Route, Routes } from 'react-router-dom'


export function App2() {
return(
<Routes>
      <Route path='/scanner-prueba/:id' element={<App></App>}></Route>
      <Route path='/' element={<div>hola mundo</div>}></Route>
      <Route path='/scanner-prueba/' element={<div>hola mundo</div>}></Route>
    </Routes>
)
    

}