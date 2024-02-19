import React, { useState } from 'react';
import axios from 'axios';

const DocumentCard = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pin, setPin] = useState('');


  const handleViewFile = (doc) => {
    setSelectedDocument(doc)
    setIsOpen(true)
  }


  const handleCancel = () => {
    setIsOpen(false);
    // Reset PIN input
    setPin('');
  };

  // Verification of logic
  const handleVerify = () => {
    console.log('Verifying PIN:', pin);
    if (pin != selectedDocument.pin) {
      alert(`Please Enter correct pin`)
    }
    if (pin == selectedDocument.pin) {
      setIsOpen(false);
      window.open(`http://localhost:8080/uploads/${selectedDocument.docName}`, "_blank", "noreferrer");
      // Reset PIN input
      setPin('');
    }
  };

  const handleDelete = async (docId, docName) => {
    try {
      console.log('Inside handleDelete')
      const response = await axios.delete(`http://localhost:8080/api/v1/files/delete?docId=${docId}&docName=${docName}`)
      if (response.data.success) {
        alert(response.data.message);
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePinChange = (e) => {
    const value = e.target.value;
    // Check if the value is empty or is a number
    if (!value || /^\d+$/.test(value)) {
      // Check if the length is less than or equal to 6
      if (value.length <= 6) {
        setPin(value);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((document, index) => (
        <div key={document._id} className="bg-white shadow-md rounded-md p-4">
          <h3 className="text-lg font-semibold mb-2">{document.docName.slice(13)}</h3>
          <div className='flex justify-around'>
            <button
              onClick={() => handleViewFile(document)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none inline-block"
            >
              Download
            </button>
            <button
              onClick={() => handleDelete(document._id, document.docName)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none inline-block"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Verification</h2>
            <input
              type="text"
              className="border border-gray-400 p-2 mb-4"
              placeholder="Enter 6 digits PIN"
              value={pin}
              onChange={handlePinChange}
            />
            <div className="flex justify-between">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleVerify}
              >
                Verify
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DocumentCard;
