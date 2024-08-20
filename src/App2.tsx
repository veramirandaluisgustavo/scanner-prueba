
import App from './App.tsx'

import {   NavLink, Route, Routes } from 'react-router-dom'


export function App2() {
return(
<>

<Routes>
      <Route path='/scanner-prueba/:id' element={<App></App>}></Route>
      
      <Route path='/scanner-prueba/' element={<NavLink to="/scanner-prueba/1234">
      <button>
        Presiona aui para ir al escanner
      </button>
    </NavLink>
    
    }></Route>
    </Routes>
    </>
)


}