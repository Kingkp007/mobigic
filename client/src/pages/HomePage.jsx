import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar';
import DocumentCard from '../components/DocumentCard';

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    fetchAllDocs();
  }, [selectedFile])

  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('userId', localStorage.getItem("userId"));

      const response = await axios.post("http://localhost:8080/api/v1/files/upload", formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        })
      if (response.data.success) {
        alert(`Pin is ${response.data.data}. Please save this pin`)
        location.reload();
      }
      console.log('Pin fro this file : ', response.data);
    } else {
      alert('Please select a file to upload.');
    }
  };


  const fetchAllDocs = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/files/getAll?userId=${localStorage.getItem("userId")}`)
      if (response.data.success) {
        setAllFiles(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-semibold mb-4">Upload File</h2>
        <input
          type="file"
          // accept=".jpg, .jpeg, .png, .gif"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Upload File
        </button>
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Documents</h1>
        {allFiles ? (<DocumentCard documents={allFiles} />) : <h2>No Document Found !</h2>}
      </div>

    </div>
  )
}

export default HomePage