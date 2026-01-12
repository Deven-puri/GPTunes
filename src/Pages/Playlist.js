import { useContext } from 'react';
import { MusicContext } from '../MusicContext';
import SongCard from '../components/SongCard';

function Playlist() {
  const { playlistSongs, playQueue, removeFromPlaylist } = useContext(MusicContext);

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="mb-10">
        <h2 className="text-5xl font-bold mb-2 text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          My Playlist
        </h2>
        <p className="text-gray-400 text-center">
          {playlistSongs.length > 0 
            ? `${playlistSongs.length} song${playlistSongs.length !== 1 ? 's' : ''} in your playlist`
            : 'Your custom playlist will appear here'
          }
        </p>
      </div>
      {playlistSongs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {playlistSongs.map((song, index) => (
            <div key={song.id} className="relative">
              <SongCard 
                song={song} 
                onPlay={() => playQueue(playlistSongs, index)}
                showAddButton={false}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromPlaylist(song.id);
                }}
                className="absolute top-3 left-3 p-2 rounded-full bg-red-500/90 backdrop-blur-sm transition-all duration-300 hover:bg-red-600 active:scale-95 z-20 shadow-lg"
                aria-label="Remove from playlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <p className="text-gray-400 text-lg mb-2">Your playlist is empty</p>
          <p className="text-gray-500 text-sm">Go to Home page and add songs to your playlist using the + button</p>
        </div>
      )}
    </div>
  )
}

export default Playlist
