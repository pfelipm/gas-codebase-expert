import { useState } from 'react';
import ApiKeyForm from './components/ApiKeyForm';
import GithubRepoForm from './components/GithubRepoForm';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [zipFile, setZipFile] = useState(null);

  const handleApiKeyChange = (key) => {
    setApiKey(key);
    console.log("Clave API guardada:", key);
  };

  const handleZipFileChange = (zipBlob) => {
    setZipFile(zipBlob);
    console.log("Fichero zip cargado y listo");
  };

  console.log('Test: ', apiKey, zipFile)

  return (

    <div>
      <img src="/gas_logo.png" alt="Logo Apps Script"></img>
      <h1>AnalIzAdor de proyectos Apps Script</h1>
      <ApiKeyForm onApiKeyChange={handleApiKeyChange} />
      <GithubRepoForm onZipFileChange={handleZipFileChange} />
      {apiKey && zipFile && (
        <ChatInterface apiKey={apiKey} zipFile={zipFile} />
      )}
    </div>
  );
}

export default App;