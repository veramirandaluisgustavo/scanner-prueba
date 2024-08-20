
import App from './App.tsx'

import {   NavLink, Route, Routes } from 'react-router-dom'


export function App2() {
return(
<>
<NavLink to="/scanner-prueba/1234">
      <button>
        Go to scanner
      </button>
    </NavLink>
<Routes>
      <Route path='/scanner-prueba/:id' element={<App></App>}></Route>
      <Route path='/' element={<div>hola mundo</div>}></Route>
      <Route path='/scanner-prueba/' element={<div>hola mundo</div>}></Route>
    </Routes>
    </>
)


}