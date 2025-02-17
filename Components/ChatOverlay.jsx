import React, { useState } from 'react';
import { ChatComponent } from './ChatComponent';
import { usaTema } from '../context/ClaroOscuroProvider';

export const ChatOverlay = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const {colores}=usaTema();
  
    const toggleChat = () => {
      setIsChatOpen(!isChatOpen);
    };
  
    return (
        <>
          <button 
            onClick={toggleChat} style={{position: 'fixed', bottom: '20px', right: '20px', backgroundColor: colores.primario, padding: '8px', borderRadius: '50%', cursor: 'pointer', zIndex: '50', fontSize: '18px', width: '40px', height: '40px'}}>
            {isChatOpen ? '❌' : '💬'}
          </button>
    
          {isChatOpen && (
            <div className='chat-scroll' style={{position: 'fixed', bottom: '80px', right: '20px', zIndex: '50', width: '320px',  maxHeight: '400px',  overflowY: 'auto',  borderRadius: '8px', border: '1px solid', backgroundColor: colores.fondo}}>
              <ChatComponent />
            </div>
          )}
           <style jsx global>{`

            .chat-scroll::-webkit-scrollbar {
                width: 10px;
            }

          .chat-scroll::-webkit-scrollbar-thumb {
            background-color: ${colores.primario}; 
            border-radius: 4px;
          }

          .chat-scroll::-webkit-scrollbar-track {
            background: ${colores.secundario}; 
            filter: brightness(70%);
            border-radius: 4px;
          }
        `}
      </style>
        </>
      );
  };
