import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Navbar({ adminName,setIsAuthenticated }) {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <Link to="/" className="text-2xl font-bold">
        EduAssistPro
      </Link>

      {/* Center: Admin Name */}
      <div className="text-xl font-medium">
        Welcome, {adminName} <span style={{fontSize:"25px"}}>📕</span>
      </div>

      {/* Right: Logout Button */}
      <button className="flex items-center bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded focus:outline-none" onClick={()=>{setIsAuthenticated(false);localStorage.removeItem("accessKey")}}>
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </nav>
  );
}

export default Navbar;
