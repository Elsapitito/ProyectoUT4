import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
console.log("GEMINI_API_KEY:", GEMINI_API_KEY ? "KEY DETECTED" : "NO KEY FOUND");

const conversationHistory = [
    { role: "model", parts: [{ text: "Eres un experto en comedia capaz de contestar cualquier cosa del mundo de la comedia y hacer chistes. Si te preguntan algo fuera del tema de comedia, harás una broma con la pregunta y luego dirás que no tienes información sobre lo que te han preguntado." }] }
];

app.post('/chat', async (req, res) => {
    try {
        const userMessage = { role: "user", parts: [{ text: req.body.message }] };
        conversationHistory.push(userMessage); // Agrega el mensaje del usuario al historial

        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: conversationHistory // Enviar todo el historial
            })
        });

        console.log("Status:", response.status);
        console.log("Headers:", response.headers);
        const data = await response.json(); // No uses .text() y luego .json()
        console.log("Raw response:", JSON.stringify(data, null, 2));



        if (!data || !data.candidates || data.candidates.length === 0) {
            return res.json({ reply: "Lo siento, no pude generar una respuesta." });
        }

        const botReply = { role: "model", parts: [{ text: data.candidates[0].content.parts[0].text }] };
        conversationHistory.push(botReply); // Guarda la respuesta en el historial

        const reply = data.candidates[0]?.content?.parts[0]?.text || "No response from AI";
        res.json({ reply });

    } catch (error) {
        console.error("Error en la solicitud a Gemini:", error);
        res.status(500).json({ error: 'Error processing request', details: error.message });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
