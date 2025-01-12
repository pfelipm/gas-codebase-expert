import { useState, useEffect } from 'react';
import { initializeGeminiConversation, sendUserInputToGemini } from '../utils';
import JSZip from 'jszip';
import ReactMarkdown from 'react-markdown';


function ChatInterface({ apiKey, zipFile }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [appState, setAppState] = useState('idle');
  const [showChatInput, setShowChatInput] = useState(false);

  useEffect(() => {
    const analyzeCode = async () => {
      if (apiKey && zipFile) {
        setAppState('loading');

        try {
          // 1. Descomprimir el archivo ZIP usando JSZip
          const zip = await JSZip.loadAsync(zipFile);

          // 2. Obtener el código fuente (asumiendo una estructura simple)
          let code = '';
          for (const filename in zip.files) {
            if (filename.endsWith('.js') || filename.endsWith('.gs')) {
              const file = zip.files[filename];
              code += await file.async('string');
            }
          }

          // 3. Inicializar la conversación con Gemini
          const initialResponse = await initializeGeminiConversation(apiKey, code);
          setMessages([{ text: initialResponse, sender: 'gemini' }]);
          setAppState('ready');
          setShowChatInput(true); // Mostrar la caja de texto y el botón
        } catch (error) {
          console.error("Error al analizar el código:", error);
          setAppState('error');
        }
      }
    };

    analyzeCode();
  }, [apiKey, zipFile]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() !== '') {
      setMessages([...messages, { text: userInput, sender: 'user' }]);
      setUserInput('');

      try {
        setAppState('loading');
        const response = await sendUserInputToGemini(apiKey, userInput, messages);
        setMessages([...messages, { text: response, sender: 'gemini' }]);
        setAppState('ready');
      } catch (error) {
        console.error("Error al enviar el mensaje a Gemini:", error);
        setAppState('error');
      }
    }
  };

  return (
    <div>
      
      <div className="gemini-response-container">
        <ul>
          {messages.map((message, index) => (
            <li key={index} className={message.sender === 'user' ? 'user-message' : 'gemini-message'}>
              <ReactMarkdown>{message.text}</ReactMarkdown> {/* Usa ReactMarkdown para renderizar el texto */}
            </li>
          ))}
        </ul>
      </div>

      {appState === 'loading' && (<div className="loading-container">
        <div className="spinner"></div></div>)}
    
      {appState === 'error' && <p>Error al conectar con Gemini.</p>}

      {showChatInput && (
        <div className="chat-input-container"> 
          <p>¿Qué más quieres saber?</p>
          <textarea rows="2" value={userInput} onChange={handleInputChange}></textarea>
          <button onClick={sendMessage}>Enviar</button>
        </div>
      )}
    
    </div>
  );
}

export default ChatInterface;