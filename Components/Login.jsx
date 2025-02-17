import React, {  useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { usaTema } from '../context/ClaroOscuroProvider';

export const Login = () =>{
    const{loginData, updateLoginData}=useContext(LoginContext);
    const{colores}=usaTema();

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Datos del login:", loginData);
    };

    return(
        <>
        <div className='container mt-5' style={{background:colores.fondo, color:colores.texto}}>
            <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>
            <form onSubmit={handleSubmit}> 
                <div className="row mb-3 align-items-center">
                    <div className='col-4'>
                    <label htmlFor="userName" className="col-form-label">Nombre de usuario</label>
                    </div>
                    <div className='col-8'>
                        <input type="text" className="form-control" id="userName" value={loginData.userName} onChange={(e)=>updateLoginData({...loginData, userName:e.target.value})} />
                </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <div className='col-4'>
                    <label htmlFor="email" className="form-label">Dirección de correo</label>
                    </div>
                    <div className='col-8'>
                        <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com" value={loginData.email} onChange={(e)=> updateLoginData({...loginData, email:e.target.value})}/>
                </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <div className='col-4'>
                    <label htmlFor="password" className="form-label">Contraseña</label>
                        </div>
                        <div className='col-8'>
                        <input type="password" className="form-control" id="password" value={loginData.password} onChange={(e)=>updateLoginData({...loginData, password:e.target.value})}/>
                </div>
                </div>
                <div className='text-center'>
                <button type="submit" className="btn btn-sm" style={{backgroundColor:colores.primario, color:colores.texto}}>Enviar</button>
                </div>
            </form>
         </div>
         </div>
         </div>
        </>
    )
}