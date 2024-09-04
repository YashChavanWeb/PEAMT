// JsonPreview.js
import React from 'react';

const JsonPreview = ({ jsonContent }) => {
  return (
    <section className='h-full flex flex-col m-4'>
      <div className='flex-grow border rounded p-4 overflow-y-auto text-left h-svh'>
        {jsonContent ? (
          <pre>{JSON.stringify(jsonContent, null, 2)}</pre> // Display formatted JSON
        ) : (
          <p>No JSON content available</p>
        )}
      </div>
    </section>
  );
};

export default JsonPreview;
