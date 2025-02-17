import { Broma } from '../Components/api'
import { Login } from '../Components/Login'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from '../Components/NavBar'
import { ListaCompra } from '../Components/useReducer'
import { ClaroOscuroProvider, usaTema } from '../context/ClaroOscuroProvider'
import { ComponentesResposive } from '../Components/ComponentesResposive'
import {ChatComponent} from '../Components/ChatComponent'
import {Dictaphone} from '../Components/ReconocimientoVoz'
import { ChatOverlay } from '../Components/ChatOverlay'
import { Informes } from '../Components/Informes'

function App() {
  const {tema, colores} = usaTema();
  return (
    <>
      <div className={`container ${tema}`} style={{paddingTop:'150px', backgroundColor: colores.fondo, color: colores.texto, minHeight:'95vh'}}>
        <Routes>
          <Route path='/api' element={<Broma ></Broma>}></Route>
          <Route path='/Login' element={<Login></Login>}></Route>
          <Route path='/useReducer' element={<ListaCompra></ListaCompra>}></Route>
          <Route path='/ComponentesResposive' element={<ComponentesResposive></ComponentesResposive>}></Route>
          <Route path='/ChatComponent' element={<ChatComponent></ChatComponent>}></Route>
          <Route path='/ReconocimientoVoz' element={<Dictaphone></Dictaphone>}></Route>
          <Route path='/Informes' element={<Informes></Informes>}></Route>
        </Routes>
        <ChatOverlay></ChatOverlay>
      </div>
    </>
  )
}

export default App
