import { useEffect, useState } from 'react';
import { FaSignOutAlt,FaRegUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
function Navbar({ adminName,setIsAuthenticated }) {
  const location = useLocation();
  const [pageName, setPageName] = useState("");
  useEffect(() => {
    const pathToPageNameMap = {
      "/": `Welcome, ${adminName}`,
      "/classrooms": "Classrooms Display",
      "/create-classroom": "Create Classroom",
      "/update-classroom": "Update Classroom",
      "/student": "Student Data",
      "/new-exam": "New Exam Creation",
      "/subjects": "Subject Display",
      "/update-subject": "Update Subject",
      "/new-subject": "New Subject Creation",
      "/reports": "Generate Reports",
      "/profile": "Your Profile",
      "/login": "Login",
    };
  
    const currentPath = location.pathname;
    setPageName(pathToPageNameMap[currentPath] || `Welcome, ${adminName}`);
  }, [location]);
  return (
    <nav className='w-full p-2 flex items-center justify-between'>
      <Link to="/" className="flex items-center gap-2">
          {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" viewBox="80.96 39.131 334.907 360.869" width="334.907px" height="360.869px"><defs><bx:export><bx:file format="svg"/></bx:export></defs><g transform="matrix(1, 0, 0, 1, -1.974874, 5.102594)"><g><g transform="matrix(1, 0, 0, 1, 6.772501, -19.23592)"><g transform="matrix(1, 0, 0, 1, -0.658524, 0)"><path style="stroke: rgb(0, 0, 0); fill: rgb(91, 134, 245);" d="M 143.552 255.927 C 143.867 318.053 144.348 403.737 144.348 403.737 C 190.058 403.138 234.374 403.935 234.374 403.935 C 233.909 363.072 234.839 309.184 234.839 309.184 C 171.725 273.379 156.36 237.878 143.552 255.927 Z"/><path style="stroke: rgb(0, 0, 0); transform-box: fill-box; transform-origin: 50% 50%; fill: rgb(91, 134, 245);" d="M 252.933 399.079 C 253.248 336.953 253.729 251.269 253.729 251.269 C 299.439 251.868 343.755 251.071 343.755 251.071 C 343.29 291.934 344.22 345.822 344.22 345.822 C 281.106 381.627 265.741 417.128 252.933 399.079 Z" transform="matrix(-1, 0, 0, -1, -0.000004, -0.000001)"/></g><path style="stroke: rgb(0, 0, 0); fill: rgb(91, 134, 245);" d="M 182.85 261.521 C 184.288 262.839 216.763 256.333 216.49 249.746 C 212.986 244.56 271.438 244.261 268.685 249.546 C 268.535 256.657 304.018 262.757 303.601 260.046 L 244.283 300 L 182.85 261.521 Z"/></g><path d="M 95.295 234.596 L 124.607 234.596 C 134.088 234.596 141.774 242.226 141.774 251.637 L 141.774 367.658 C 141.774 377.069 134.088 384.699 124.607 384.699 L 95.295 384.699 C 94.764 378.633 94.764 241.258 95.295 234.596 Z" style="stroke: rgb(0, 0, 0); fill: rgb(91, 134, 245);"/><path d="M 359.401 384.699 L 388.713 384.699 C 398.194 384.699 405.88 377.069 405.88 367.658 L 405.88 251.637 C 405.88 242.226 398.194 234.596 388.713 234.596 L 359.401 234.596 C 358.87 240.662 358.87 378.037 359.401 384.699 Z" style="stroke: rgb(0, 0, 0); fill: rgb(91, 134, 245); transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(-1, 0, 0, -1, 0.00001, 0.000017)"/></g><g transform="matrix(1, 0, 0, 1, 0.388779, 0)"><rect x="147.272" y="115.301" width="204.983" height="100.284" style="stroke: rgb(0, 0, 0); fill: rgb(91, 134, 245);" rx="21.978" ry="21.978"/><path d="M 141.367 137.78 C 141.683 147.717 142.096 176.386 141.367 193.09 C 124.473 193.635 109.266 180.709 109.266 165.435 C 109.266 150.162 123.638 137.78 141.367 137.78 Z" style="stroke: rgb(0, 0, 0); fill: rgb(91, 134, 245);"/><path d="M 390.327 193.106 C 390.643 183.169 391.056 154.5 390.327 137.796 C 373.433 137.251 358.226 150.177 358.226 165.451 C 358.226 180.724 372.598 193.106 390.327 193.106 Z" style="stroke: rgb(0, 0, 0); transform-box: fill-box; transform-origin: 50% 50%; fill: rgb(91, 134, 245);" transform="matrix(-1, 0, 0, -1, 0.000005, 0.000002)"/><rect x="171.211" y="137.778" width="157.104" height="55.328" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255);" rx="15.573" ry="15.573"/><circle style="stroke: rgb(0, 0, 0); fill: rgb(91, 134, 245); stroke-width: 2.73609px;" transform="matrix(0.365005, 0, 0, 0.365965, 1.148903, 98.883249)" cx="581.2" cy="178.2" r="36.41"/><circle style="stroke: rgb(0, 0, 0); fill: rgb(91, 134, 245); stroke-width: 2.73609px;" transform="matrix(0.365005, 0, 0, 0.365965, 74.569238, 98.883249)" cx="581.2" cy="178.2" r="36.41"/></g><g transform="matrix(1, 0, 0, 1, 2.263725, 1.499617)"><rect x="72.423" y="49.231" width="153.397" height="86.539" style="stroke: rgb(0, 0, 0); transform-box: fill-box; transform-origin: 54.4617% 45.787%; stroke-miterlimit: 5.82; fill: rgb(255, 255, 255);" transform="matrix(0.960565, -0.278055, 1.760955, 0.53131, 88.954704, -5.651866)"/><g><path style="stroke: rgb(0, 0, 0); stroke-miterlimit: 5.82; fill: rgb(255, 255, 255); stroke-width: 3px;" d="M 394.636 89.158 C 394.321 95.672 394.813 109.565 394.636 115.301"/><circle style="stroke: rgb(0, 0, 0); stroke-miterlimit: 5.82; stroke-width: 16.9056px; fill: rgb(255, 255, 255);" transform="matrix(0.058755, 0, 0, 0.059549, 348.846349, 96.447786)" cx="780" cy="373.4" r="56.8"/><path d="M 392.634 121.265 L 396.868 121.19 C 398.384 120.204 401.668 135.56 401.328 135.781 L 388.93 135.781 C 388.631 135.752 390.142 121.024 392.634 121.265 Z" style="stroke: rgb(0, 0, 0); stroke-miterlimit: 5.82; fill: rgb(255, 255, 255);"/></g></g></g></svg> */}
          <div className='bg-white border border-black/30 rounded-xl p-2 flex items-center justify-center'>
            <img src="/logo.svg" className='size-9' alt="" />
          </div>

          <span className="text-xl font-bold">EduAssistPro</span>
      </Link>

      <div className="text-xl font-bold">
        {pageName}
      </div>

      <details className="dropdown dropdown-end text-black">
        <summary tabIndex={0} role="button" className="btn m-1 bg-black border-none shadow-lg rounded-full size-12 p-0.5">
          <img src="/images/raj.png" alt="Admin" className="rounded-full w-full"/>
        </summary>
        <ul tabIndex={0} className="z-1 dropdown-content shadow-lg shadow-black/20 border menu bg-base-100 rounded-box z-1 w-32 p-2">
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
