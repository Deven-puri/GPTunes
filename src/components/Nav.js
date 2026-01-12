import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Nav() {
  const activeClassName = "text-green-400 border-b-2 border-green-400";
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-40 p-4 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <ul className="flex justify-center space-x-8 text-lg flex-1">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? activeClassName + " px-4 py-2" 
                  : "px-4 py-2 hover:text-green-400 transition-colors duration-300 text-gray-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/search" 
              className={({ isActive }) => 
                isActive 
                  ? activeClassName + " px-4 py-2" 
                  : "px-4 py-2 hover:text-green-400 transition-colors duration-300 text-gray-300"
              }
            >
              Search
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/liked" 
              className={({ isActive }) => 
                isActive 
                  ? activeClassName + " px-4 py-2" 
                  : "px-4 py-2 hover:text-green-400 transition-colors duration-300 text-gray-300"
              }
            >
              Liked Songs
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/playlist" 
              className={({ isActive }) => 
                isActive 
                  ? activeClassName + " px-4 py-2" 
                  : "px-4 py-2 hover:text-green-400 transition-colors duration-300 text-gray-300"
              }
            >
              Playlist
            </NavLink>
          </li>
        </ul>
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <div className="flex items-center gap-3">
                {currentUser.photoURL && (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName || 'User'} 
                    className="w-8 h-8 rounded-full border-2 border-green-400"
                  />
                )}
                <span className="text-gray-300 text-sm hidden md:block">
                  {currentUser.displayName || currentUser.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors duration-300 text-sm font-medium border border-red-500/30"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="px-4 py-2 text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm font-medium"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 text-sm font-medium"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav
