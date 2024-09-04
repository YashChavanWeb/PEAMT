// FilePreview.js
import React, { useState, useEffect } from 'react';

const FilePreview = ({ file }) => {
  const [fileURL, setFileURL] = useState('');

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileURL(url);

      // Cleanup function to revoke the object URL
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  if (!file) {
    return <p>No file selected</p>; // Early return if no file is provided
  }

  // Render preview based on file type
  const renderPreview = () => {
    if (file.type.startsWith('image/')) {
      return <img src={fileURL} alt="File Preview" className='max-w-full h-auto' />;
    } else if (file.type === 'application/pdf') {
      return (
        <iframe
          src={fileURL}
          title="PDF Preview"
          width="100%"
          height="500px"
          style={{ border: 'none' }}
        />
      );
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return (
        <div>
          <p>DOCX files cannot be previewed directly. <a href={fileURL} target="_blank" rel="noopener noreferrer">Click here to view or download the file</a>.</p>
        </div>
      );
    } else {
      return <p>Preview not available for this file type.</p>;
    }
  };

  return (
    <div className='border rounded p-4'>
      <h3 className='text-lg font-bold mb-2'>File Preview:</h3>
      {renderPreview()}
    </div>
  );
};

export default FilePreview;
