// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="navbar bg-base-100 shadow px-6">
//       {/* Left */}
//       <div className="flex-1">
//         <Link to="/" className="text-xl font-bold">
//           Ticket AI
//         </Link>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-4">
//         {!token ? (
//           <>
//             <Link to="/login" className="btn btn-ghost">
//               Login
//             </Link>
//             <Link to="/signup" className="btn btn-primary">
//               Signup
//             </Link>
//           </>
//         ) : (
//           <>
//             <span className="text-sm">
//               Hi, <b>{user?.email}</b>
//             </span>

//             {/* ✅ ADMIN BUTTON (only for admins) */}
//             {user?.role === "admin" && (
//               <Link to="/admin" className="btn btn-outline btn-sm">
//                 Admin
//               </Link>
//             )}

//             <button
//               className="btn btn-error btn-sm"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// {user?.role === "moderator" && (
//   <Link to="/moderator/tickets" className="btn btn-outline btn-sm">
//     My Tickets
//   </Link>
// )}


// export default Navbar;
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow px-6">
      {/* Left */}
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          Ticket AI
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {!token ? (
          <>
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm">
              Hi, <b>{user?.email}</b>
            </span>

            {/* ✅ ADMIN BUTTON */}
            {user?.role === "admin" && (
              <Link to="/admin" className="btn btn-outline btn-sm">
                Admin
              </Link>
            )}

            {/* ✅ MODERATOR BUTTON */}
            {user?.role === "moderator" && (
              <Link to="/moderator/tickets" className="btn btn-outline btn-sm">
                My Tickets
              </Link>
            )}

            <button
              className="btn btn-error btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;

