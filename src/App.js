import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Liked from './Pages/Liked';
import Playlist from './Pages/Playlist';
import Search from './Pages/Search';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Nav from './components/Nav';
import MusicPlayer from './components/MusicPlayer';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';


function App() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isHomePage = location.pathname === '/';

  const backgroundStyle = isHomePage && !isAuthPage
    ? {
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }
    : {};

  const appClassName = `App text-white min-h-screen pb-32 flex flex-col ${
    !isHomePage && !isAuthPage ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : ''
  }`;

  return (
    <div className={appClassName} style={backgroundStyle}>
      {!isAuthPage && <Nav/>}
      <main className={`flex-grow ${isAuthPage ? '' : 'pt-8 md:pt-12 px-4 md:px-6'}`}>
        <Routes>
          <Route 
            path="/login" 
            element={currentUser ? <Navigate to="/" replace /> : <Login />} 
          />
          <Route 
            path="/signup" 
            element={currentUser ? <Navigate to="/" replace /> : <SignUp />} 
          />
          
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/liked" 
            element={
              <ProtectedRoute>
                <Liked />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/playlist" 
            element={
              <ProtectedRoute>
                <Playlist />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAuthPage && <MusicPlayer />}
    </div>
  );
}

export default App;
