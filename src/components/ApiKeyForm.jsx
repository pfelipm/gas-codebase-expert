import { useState } from 'react';

function ApiKeyForm({ onApiKeyChange }) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario
    onApiKeyChange(apiKey); // Llama a la función para guardar la clave API en el estado de la aplicación
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="apiKey">Tu clave de la API de Gemini:</label>
      <input
        type="password"
        id="apiKey"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)} // Actualiza el estado al escribir en el input
      />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default ApiKeyForm;