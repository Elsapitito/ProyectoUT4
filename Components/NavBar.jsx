import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import { usaTema } from '../context/ClaroOscuroProvider'
import { BotonTema } from './BotonTema'
import { Buscador } from './Buscador'
import hola from '../assets/hola.png'
import user from '../assets/user.png'

export const NavBar = () => {
    const context=useContext(LoginContext);
    const{loginData}=context;
    const {colores}=usaTema();

    const iconStyle = {
        filter: colores.navbarFondo === '#401c50' ? 'invert(1)' : 'none',
        width: '45px',
        height: '45px',
        objectFit: 'contains'
    };

    const helloIconStyle = {
        ...iconStyle,
        width: '40px',
        height: '40px'
    };

  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Playwrite+IN:wght@100..400&display=swap" rel="stylesheet" />
    <div style={{height: '1px'}}>
        <nav className="navbar navbar-expand-lg sticky-top px-0" style={{backgroundColor:colores.navbarFondo, color:colores.navbarTexto}}>
            <div className="container-fluid">
                <span className="navbar-text" style={{fontSize:'30px', fontFamily:'Playwrite IN, serif', color:colores.navbarTexto}}>
                Mi Página
                </span>
            </div>
        </nav>

        <nav className="navbar navbar-expand-lg sticky-top" style={{backgroundColor:colores.navbarFondo, color:colores.navbarTexto}}>
            <div className="container-fluid d-flex justify-content-between">
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', width: '100%',  gap: '20px' }}>
                    <div style={{ marginRight: 'auto' }}>
                        <NavLink to='/api' className="nav-link active" style={{fontSize:'20px',  textDecoration: 'none'}}>API</NavLink>
                    </div>
                    <NavLink to='/useReducer' className="nav-link active" style={{fontSize:'20px', textDecoration: 'none'}}>useReducer</NavLink>
                    <div style={{display: 'flex', gap: '20px' , paddingLeft: '20px'}}>
                        <NavLink to='/ComponentesResposive' className="nav-link active" style={{fontSize:'20px', textDecoration: 'none', whiteSpace: 'nowrap'}}>Componentes Responsive</NavLink>
                        <NavLink to='/ReconocimientoVoz' className="nav-link active" style={{fontSize:'20px', textDecoration: 'none', whiteSpace: 'nowrap'}}>Reconocimiento de Voz</NavLink>
                        <NavLink to='/Informes' className="nav-link active" style={{fontSize:'20px', textDecoration: 'none', whiteSpace: 'nowrap'}}>Informes</NavLink> 
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
                    {/* <div style={{width:'200px', backgroundColor:colores.primario, display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center'}}>
                        <Buscador></Buscador>
                    </div> */}
                    <div style={{ width: '60px' }}>
                        <BotonTema/>
                    </div>
                    <NavLink to='/Login' className="nav-link active p-0 " style={{width:'45px'}}>
                        <img src={user} alt="user" style={iconStyle}/>
                    </NavLink>
                    <button type='button' className='btn p-0' data-bs-toggle="modal" data-bs-target="#exampleModal" style={ {width:'50px'}}>
                        <img src={hola} alt="hello" className='float-end 'style={iconStyle} />
                    </button>
                </div>
            </div>
        </nav>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{backgroundColor:colores.fondo, color:colores.texto}}>
                <div className="modal-header">
                </div>
                <div className="modal-body" > 
                    {`Hola ${loginData.userName}`}
                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-light" data-bs-dismiss="modal" style={{backgroundColor:colores.primario, color:colores.texto}}>Hola!</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
