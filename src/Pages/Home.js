import { useContext, useState, useEffect } from 'react';
import { MusicContext } from '../MusicContext';
import SongCard from '../components/SongCard';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { songs, playQueue, loading, playlistSongs } = useContext(MusicContext);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const allSongs = songs;

  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-6 w-full">
      <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative inline-block mb-6">
          <h1
            className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 mb-4 tracking-tight"
            style={{ 
              textShadow: '0 0 40px rgba(74, 222, 128, 0.3)',
              animation: 'gradient-shift 3s ease infinite',
              backgroundSize: '200% 200%'
            }}
          >
            GPTunes
          </h1>
          <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-green-600/20 blur-3xl rounded-full -z-10 animate-pulse"></div>
        </div>
        
        <p
          className="text-gray-100 mt-6 text-2xl md:text-3xl mb-4 font-light"
          style={{ textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8)' }}
        >
          Welcome to the future of music
        </p>
        
        <p
          className="text-gray-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
          style={{ textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7)' }}
        >
          Discover, play, and curate your perfect playlist. Add your favorite tracks with one click.
        </p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-10 mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 shadow-xl">
            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1">{songs.length}</div>
            <div className="text-sm text-gray-400">Available Songs</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 shadow-xl">
            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1">{playlistSongs.length}</div>
            <div className="text-sm text-gray-400">In Your Playlist</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 shadow-xl">
            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1">∞</div>
            <div className="text-sm text-gray-400">Possibilities</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => navigate('/playlist')}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50 text-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            View Playlist
          </button>
          <button
            onClick={() => navigate('/search')}
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 text-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Music
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-green-500"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-green-500/30"></div>
          </div>
          <p className="mt-6 text-gray-400 text-lg">Loading amazing music...</p>
        </div>
      ) : songs.length > 0 ? (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                All Songs
              </h2>
              <p className="text-gray-400 text-sm md:text-base flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                {songs.length} songs available - Click the + button to add to your playlist
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              <span className="text-sm font-semibold">All Tracks</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {allSongs.map((song, index) => (
              <div 
                key={song.id}
                className="transform transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <SongCard 
                  song={song} 
                  onPlay={() => playQueue(allSongs, index)}
                  showAddButton={true}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 max-w-md mx-auto border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-300 text-lg mb-2">No songs available</p>
            <p className="text-gray-500 text-sm">Check your connection and try again</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home