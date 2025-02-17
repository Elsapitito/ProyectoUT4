import React, { useReducer, useRef } from "react";
import { usaTema } from "../context/ClaroOscuroProvider";

export function ListaCompra() {
    const inputRef = useRef();
    const {colores}=usaTema();

    const [items, dispatch] = useReducer((state, action) => {
      switch (action.type) {
        case 'add':
            return [
                ...state,
                {
                  id: state.length,
                  name: action.name
                }
              ];
        case 'remove':
          return state.filter((_, index) => index != action.index);
        case 'clear':
            return [];
        default:
          return state;
      }
    }, []);
  
    function handleSubmit(e) {
        e.preventDefault();
        dispatch({
          type: 'add',
          name: inputRef.current.value
        });
        inputRef.current.value = '';
    }
  
    return (
      <>
        <div className="container mt-4" style={{backgroundColor:colores.fondo, color:colores.texto}}>
            <h2 className="mb-3 text-center">La lista de la compra</h2>
        <form onSubmit={handleSubmit} className="mb-3 d-flex justify-content-center">
          <input ref={inputRef} className="form-control form-control-sm " style={{width:'200px', backgroundColor:colores.secundario, color:colores.texto, borderColor:colores.primario}}/>
        </form>
        <div className="d-flex justify-content-center mb-3">
            <button onClick={() => dispatch({ type: "clear" })} className="btn btn-sm " style={{backgroundColor: colores.primario, color:colores.texto, padding:'o.375rem 0.75rem', width:'auto', minWidth:'300px'}}>Vaciar lista</button>
        </div>
        <ul className="list-group" style={{maxWidth:'300px', margin:'0 auto'}}>
          {items.map((item, index) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center py-2" style={{backgroundColor:colores.fondo, color:colores.texto, borderColor:colores.primario}}>
              <span className="flex-grow-1 text-center text-break" style={{wordWrap:'break-word', maxWidth:'calc(100% - 40px)', fontSize:'0.9rem'}}> {item.name}</span>
              <button onClick={() => dispatch({ type: 'remove', index })} className="btn btn-sm btn-outline-danger" style={{width:'30px', height:'30px', padding:'0', flexShrink:0, fontSize:'0.8rem', backgroundColor:colores.secundario, color:colores.texto, borderColor:colores.primario}}>
                X
              </button>
            </li>
          ))}
        </ul>
        </div>
      </>
    );
  }