import React, { useState, useEffect } from 'react';
import { usaTema } from '../context/ClaroOscuroProvider';

export const Broma = () =>{
    const [bromas, setBromas]=useState({});
    const [isModalOpen, setIsModalOpen]=useState(false);
    const {colores} = usaTema();
   // const [modalTimer, setModalTimer]=useState(null);

    const api = async () => {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();
        setBromas(data);
        //console.log(data)
    }

    const openModalWithTimeout = () =>{
        setIsModalOpen(true);
    };

    const closeModale=()=>{
        setIsModalOpen(false);
         api();
    };

    useEffect(()=>{
        api();
        const timer = setTimeout(()=>{
            openModalWithTimeout();
        },5000);
    return()=>{
            clearTimeout(timer);
    };
},[]);

/*useEffect(()=>{
    if(isModalOpen){

    const timer = setTimeout(()=>{
        setIsModalOpen(false);
    },5000);
    return ()=>clearTimeout(timer);
}
},[isModalOpen]);*/

        return(
            <div style={{backgroundColor:colores.fondo, color:colores.texto}}>
                <h1 className="text-center">HAHA Bromas</h1>

                <div className="container text-center">
                    <div className="row justify-content-md-center">

                        <div className="col-md-auto"> {bromas.setup ? bromas.setup : 'Cargando...'}</div> 
                    </div>

                    <div className="row justify-content-md-center">
                        <div className="col-md-auto">.....</div>
                    </div>

                    {isModalOpen &&(
                        <div className="row justify-content-md-center">
                            <div className="modal fade show" style={{ display: 'block' }}>
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content" style={{backgroundColor:colores.fondo}}>
                                        <div className="modal-body" >
                                            <p style={{color: colores.texto}}>{bromas.punchline}</p>
                                        </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn " style={{backgroundColor:colores.primario, color: colores.texto}} onClick={()=>{
                                            closeModale(); 
                                            setTimeout(()=>{
                                                openModalWithTimeout();
                                            },5000);
                                            }}>Siguiente broma</button>

                                        <button type="button" class="btn " onClick={()=>{closeModale();}} style={{backgroundColor:colores.secundario, color:colores.texto}}>No quiero más bromas</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div> 
            </div>
        );

    };