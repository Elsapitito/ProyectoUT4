import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { usaTema } from '../context/ClaroOscuroProvider'


export const Dictaphone = () => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const {colores}=usaTema();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(()=>{
    if(transcript){
        setInputText(transcript);
    }
  },[transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>El buscador no admite reconocimiento de voz.</span>;
  }

  const handleInputChange=(e)=>{
    setInputText(e.target.value);
  }

  const handleSubmit=()=>{
    if(inputText.trim()){
        setMessages([...messages, inputText]);
        setInputText('');
        resetTranscript();
    }
  };

  return (
    <div className='p-4 max-w-lg mx-auto'>
        <div className='space-y-4'>
            <div className='flex flex-col gap-4'>
                <input type="text" value={inputText} onChange={handleInputChange} placeholder="Escribe/dicta tu mensaje" className="p-2 border rounded-lg w-full" style={{backgroundColor:colores.primario, color:colores.texto}}/>
                <div className="flex gap-2">
                    <button onClick={handleSubmit} className=' px-4 py-2 rounded-lg ' style={{backgroundColor:colores.primario, color:colores.texto}}>
                        Enviar
                    </button>

                    <button onClick={SpeechRecognition.startListening} className={`px-4 py-2 rounded-lg `} style={{backgroundColor:colores.primario, color:colores.texto}}>
                        {listening ? 'Deneter':'Iniciar'} Micrófono
                    </button>
                </div>

                <p className='text-sm' style={{color:colores.texto}}>
                    Estado del micrófono {listening ? 'Escuchando':'Apagado'}
                </p>
            </div>
            <div className='mt-6'>
                <h3 className='text-lg font-semibold mb-2'style={{color:colores.texto}}>Mensajes:</h3>
                <div className='space-y-2' style={{color:colores.texto}}>
                    {messages.map((message, index)=>(
                        <div key={index} className='p-3 bg-gray-100 rounded-lg'>
                            {message}
                        </div>
                    ))}
                </div>
            </div>
      </div>
    </div>
  );
};