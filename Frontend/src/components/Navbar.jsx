import { FaSignOutAlt,FaRegUser } from 'react-icons/fa';
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
      {/* <button className="flex items-center bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded focus:outline-none" onClick={()=>{setIsAuthenticated(false);localStorage.removeItem("accessKey")}}>
        <FaSignOutAlt className="mr-2" /> Logout
      </button> */}

      <details className="dropdown dropdown-end text-black">
        <summary tabIndex={0} role="button" className="btn m-1 bg-black border-none shadow-lg rounded-full size-12 p-0.5">
          <img src="/images/raj.png" alt="Admin" className="rounded-full w-full"/>
        </summary>
        <ul tabIndex={0} className="z-1 dropdown-content shadow-lg shadow-black/40 menu bg-base-100 rounded-box z-1 w-32 p-2">
          <li><a>
          <FaRegUser/>Profile
            </a></li>
          <li><button type='button' onClick={()=>{setIsAuthenticated(false);localStorage.removeItem("accessKey")}}>
          <FaSignOutAlt/>Logout
          </button></li>
        </ul>
      </details>

    </nav>
    

  );
}

export default Navbar;
