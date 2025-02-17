import { ClaroOscuroContext } from "./ClaroOscuroContext";
import React, {  useContext, useState } from "react";

const temas ={
    claro: {
        fondo: '#ffffff',
        texto: '#333333',
        primario: '#fcaa98',
        secundario: '#ecac9e',
        navbarFondo: '#fcaa98',
        navbarTexto: '#333333'
        
    },
    oscuro: {
        fondo: '#333333',
        texto: '#ffffff',
        primario: '#401c50',
        secundario: '#4e4254',
        navbarFondo: '#401c50',
        navbarTexto: '#ffffff'
    }
};

export const ClaroOscuroProvider=({children})=>{
    const[tema, setTema]=useState('claro');

    const cambiarTema=()=>{
        setTema(prevTema => prevTema === 'claro' ? 'oscuro' : 'claro');
    };

    const colores=temas[tema];

    return(
        <ClaroOscuroContext.Provider value={{tema, cambiarTema, colores: temas[tema]}}>
            {children}
        </ClaroOscuroContext.Provider>
    );
}

export function usaTema(){
    return useContext(ClaroOscuroContext);
}