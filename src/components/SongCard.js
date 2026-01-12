import { useContext } from 'react';
import { MusicContext } from '../MusicContext';

function SongCard({ song, onPlay, showAddButton = false }) {
  const { likedSongs, toggleLike, addToPlaylist, isInPlaylist } = useContext(MusicContext);
  const isLiked = likedSongs.has(song.id);
  const inPlaylist = isInPlaylist(song.id);

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center text-center hover:bg-gray-700/90 transition-all duration-300 group relative transform hover:scale-105 hover:shadow-2xl cursor-pointer">
      <div className="relative w-full mb-4" onClick={() => onPlay(song)}>
        <img 
          src={song.albumArt} 
          alt={`${song.title} album art`} 
          className="w-full aspect-square object-cover rounded-lg shadow-xl transition-transform duration-300 group-hover:brightness-110" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-lg flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-green-500 rounded-full p-3 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h3 className="text-base font-semibold text-white truncate w-full mb-1">{song.title}</h3>
        <p className="text-sm text-gray-400 truncate w-full">{song.artist}</p>
      </div>
      
      {showAddButton && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (!inPlaylist) {
              addToPlaylist(song);
            }
          }} 
          className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 ${
            inPlaylist 
              ? 'bg-green-500/80 opacity-100' 
              : 'bg-black/60 opacity-0 group-hover:opacity-100 hover:bg-green-500/80'
          }`}
          aria-label={inPlaylist ? 'Already in playlist' : 'Add to playlist'}
          disabled={inPlaylist}
        >
          {inPlaylist ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      )}

      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(song.id);
        }} 
        className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/80 active:scale-95"
        aria-label={isLiked ? 'Unlike song' : 'Like song'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors duration-200 ${isLiked ? 'text-green-400 fill-green-400' : 'text-gray-300'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
        </svg>
      </button>
    </div>
  );
}

export default SongCard;