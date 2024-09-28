import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JsonPreview from './JsonPreview'; // Adjust the path as needed
import FilePreview from './FilePreview'; // Import the new FilePreview component

function FileUploader() {
  const [file, setFile] = useState(null);
  const [jsonContent, setJsonContent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    setFile(file);
  };

  const onFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const onFileUpload = async () => {
    if (!file) {
      toast.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/api/convert/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response Data:', response.data); // Debugging line
      toast.success('File converted to JSON successfully');
      setJsonContent(response.data.json); // Store JSON content
    } catch (error) {
      toast.error('Error converting file to JSON');
      console.error('Error converting file:', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const clearAll = () => {
    setFile(null);
    setJsonContent(null);
    document.getElementById('fileInput').value = ''; // Clear the file input
  };

  return (
    <div className='flex flex-row'>
      <section>
        <section
          className={`border-2 border-dashed p-4 rounded-lg h-32 m-4 ${isDragging ? 'bg-gray-200' : 'bg-white'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={onFileChange}
            className='hidden'
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer text-blue-500 hover:text-blue-700"
          >
            Click to upload or drag and drop a file here
          </label>
          <button onClick={onFileUpload} className='p-3 m-3 bg-cyan-700 text-white rounded-md'> Upload </button>
          <button onClick={clearAll} className='p-3 m-3 bg-gray-500 text-white rounded-md'> Clear </button>
        </section>
        <FilePreview file={file} /> {/* Use the FilePreview component */}
      </section>
      <section className='flex-grow flex flex-col w-1/2 m-4'>
        <JsonPreview jsonContent={jsonContent} />
      </section>
      <ToastContainer />
    </div>
  );
}

export default FileUploader;