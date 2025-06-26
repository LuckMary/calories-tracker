import { useState } from 'preact/hooks';
import './style.css';

 function Recognition() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [recognizedText, setRecognizedText] = useState<string>('');

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      setSelectedFile(target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploadStatus('Uploading...');
      setRecognizedText('');
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus('File processed successfully!');
        setRecognizedText(data.text || 'No text recognized');
      } else {
        setUploadStatus('Upload failed');
      }
    } catch (error) {
      setUploadStatus('Error during upload');
      console.error('Upload error:', error);
    }
  };

  return (
    <div class="recognition-page">
      <h1>File Recognition</h1>
      <div class="upload-container">
        <input 
          type="file" 
          onChange={handleFileChange}
          accept="image/*"
        />
        <button onClick={handleUpload} disabled={!selectedFile}>
          Upload
        </button>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>}
      {recognizedText && (
        <div class="text-result">
          <h3>Recognized Text:</h3>
          <pre>{recognizedText}</pre>
        </div>
      )}
    </div>
  );
}

export default Recognition