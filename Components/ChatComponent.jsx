import React, { useState } from 'react';
import { usaTema } from '../context/ClaroOscuroProvider';


const API_KEY = 'AIzaSyD9bI5Asm_eTthkJ-KxbiOjxDXiKtCTEd4';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/chat-bison-001:generateText';

export const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading]=useState(false);
  const {colores} = usaTema();

  const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { text: input, sender: "user" }];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }), // Solo enviamos el mensaje actual
            });

            if (!response.ok) throw new Error("Error en la solicitud al servidor");

            const data = await response.json();

            if (!data || !data.reply) {
                throw new Error("Respuesta vacía o malformada");
            }

            setMessages([...newMessages, { text: data.reply, sender: "bot" }]);
        } catch (error) {
            console.error("Error en el chat:", error);
            setMessages([...newMessages, { text: "Error al obtener respuesta.", sender: "bot" }]);
        }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user', timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try{
        const botResponse = await sendMessage(input);
        const botMessage = {
            text: botResponse,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, botMessage]);
    } catch(error){
        console.error('Error al generar respuesta:', error);
      const errorMessage = {
        text: "¡Ups! Algo salió mal con mi rutina de comedia. ¿Podrías intentarlo de nuevo?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    }finally{
        setIsLoading(false);
    }
  };


  return (
    <>
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border rounded-lg shadow-lg" style={{background:colores.fondo, color:colores.texto}}>

      <div className="p-4 border-b rounded-t-lg">
        <h2 className="text-xl font-bold">Comediante Virtual 🎭</h2>
        <p className="text-sm">¡Pregúntame sobre comedia!</p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500">
            ¡Haz una pregunta sobre comedia y te responderé con humor! 😊
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' ? 'bg-yellow-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}>
              <p style={{color:colores.texto}}>{message.text}</p>
              <span className="text-xs opacity-75 mt-1 block" style={{color:colores.texto}}>
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none">
              <div className="flex items-center gap-2">
                <span className="animate-spin">🎯</span>
                <p>Pensando en algo gracioso...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="¿Qué quieres saber sobre comedia?" className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-yellow-500" disabled={isLoading} style={{backgroundColor:colores.primario, color:colores.texto}}/>
          <button type="submit" disabled={!input.trim() || isLoading} className="bg-yellow-500  p-2 rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed" style={{backgroundColor:colores.primario, color:colores.texto}}>
            📤
          </button>
        </div>
      </form>
    </div>
    </>
  );
};
// const context=`Eres un experto en comedia capaz de contestar cualquier cosa del mundo de la comedia y hacer chistes. 
//                     Si te preguntan algo fuera del tema de comedia, harás una broma con la pregunta y luego dirás que no 
//                     tienes información sobre lo que te han preguntado. La pregunta del usuario es: ${userMessage}`;