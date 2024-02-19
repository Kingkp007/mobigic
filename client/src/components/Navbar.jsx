import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear();
        alert("Logged out successfully !");
        navigate("/login");
    }
    return (
        <nav className="flex items-center justify-between bg-gray-800 p-4">

            <div className="text-white font-bold text-3xl">
                Mobigic - File Upload
            </div>


            <button onClick={handleLogOut} className="text-white px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 focus:outline-none">
                Logout
            </button>
        </nav>

    )
}

export default Navbar