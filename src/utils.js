import { GoogleGenerativeAI } from '@google/generative-ai';

export async function initializeGeminiConversation(apiKey, code) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      const prompt =`Aquí tienes el código de un proyecto de Apps Script:

          \`\`\`javascript
          ${code}
          \`\`\`

          Analiza su estructura y funcionamiento.
        `;

      return (await model.generateContent(prompt)).response.text();
       
    } catch (error) {
      console.error("Error al inicializar la conversación con Gemini:", error);
      throw error;
    }
  }

  export async function sendUserInputToGemini(apiKey, userInput, conversationHistory = []) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      // Construir el historial de la conversación
      let conversation = '';
      conversationHistory.forEach(message => {
        conversation += `${message.sender}: ${message.text}\n`;
      });

      return (await model.generateContent(
        `${conversation}
  
          user: ${userInput}`
      )).response.text();
    } catch (error) {
      console.error("Error al enviar el mensaje a Gemini:", error);
      throw error;
    }
  }