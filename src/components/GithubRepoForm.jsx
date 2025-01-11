import { useState } from 'react';

function GithubRepoForm({ onZipFileChange }) {
  const [zipFile, setZipFile] = useState(null);
  
  const handleZipFileChange = (event) => {
    setZipFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (zipFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const zipBlob = new Blob([e.target.result], { type: 'application/zip' });
        onZipFileChange(zipBlob);
      };

      reader.readAsArrayBuffer(zipFile);
      console.log("Formulario enviado")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="zipFile">Archivo ZIP del repositorio:</label>
      <input
        type="file"
        id="zipFile"
        accept=".zip"
        onChange={handleZipFileChange}
        style={{ marginRight: '10px', marginLeft: '10px' }}
      />
      <button type="submit">Cargar</button>
    </form>
  );
}

export default GithubRepoForm;