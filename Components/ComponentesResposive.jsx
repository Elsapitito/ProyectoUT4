import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { usaTema } from '../context/ClaroOscuroProvider';


export const ComponentesResposive = () => {
  const [mostrarComp1, setMostrarComp1] = useState(false);
  const [mostrarComp2, setMostrarComp2] = useState(false);
  const [mostrarComp3, setMostrarComp3] = useState(false);
  const [tamañoPant, setTamañoPant] = useState(window.innerWidth);
  const {colores} = usaTema();

  useEffect(() => {
    const handleResize = () => setTamañoPant(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleComponent = (setterFunction, currentState) => {
    setterFunction(!currentState);
  };

  const breakpoint = 768; 

  const buttonStyle = {
    margin: '5px',
    width: tamañoPant < breakpoint ? '100%' : '250px',
    backgroundColor:colores.primario, 
    color:colores.texto,
    borderColor: colores.primario
  };

  const componentStyle = {
    backgroundColor: colores.fondo,
    color: colores.texto,
    padding: tamañoPant < breakpoint ? '0.5rem' : '1rem',
    borderRadius: '0.5rem',
    minheight: tamañoPant < breakpoint ? '150px' : '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.5rem',
    width:'100%',
    boxSizing: 'border-box'
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box'
  };

  const componentsContainerStyle = {
    display: 'flex',
    flexDirection: tamañoPant < breakpoint ? 'column' : 'row',
    gap: '10px',
    alignItems:'flex-start',
    width: '100%',
    marginLeft: tamañoPant < breakpoint ? '0' : 'auto',
  };

  const componentGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: tamañoPant < breakpoint ? '100%' : 'calc(33.33% - 14px)',
    alignItems: tamañoPant < breakpoint ? 'flex-start' : 'stretch'
  };

 

  return (
    <div style={containerStyle}>
      <div style={componentsContainerStyle}>
        <div style={componentGroupStyle}>
        <Button 
          onClick={() => toggleComponent(setMostrarComp1, mostrarComp1)} 
          variant="primary"
          style={buttonStyle}
        >
          {mostrarComp1 ? "Ocultar" : "Mostrar"} Componente 1
        </Button>
        {mostrarComp1 && (
            <div style={componentStyle}>
              Componente 1
            </div>
          )}
        </div>

        <div style={componentGroupStyle}>
        <Button 
          onClick={() => toggleComponent(setMostrarComp2, mostrarComp2)} 
          variant="primary"
          style={buttonStyle}
        >
          {mostrarComp2 ? "Ocultar" : "Mostrar"} Componente 2
        </Button>
        {mostrarComp2 && (
            <div style={componentStyle}>
              Componente 2
            </div>
          )}
        </div>

        <div style={componentGroupStyle}>
        <Button 
          onClick={() => toggleComponent(setMostrarComp3, mostrarComp3)} 
          variant="primary"
          style={buttonStyle}
        >
          {mostrarComp3 ? "Ocultar" : "Mostrar"} Componente 3
        </Button>
        {mostrarComp3 && (
            <div style={componentStyle}>
              Componente 3
            </div>
          )}
        </div>
      </div>
      </div>

  );
};
