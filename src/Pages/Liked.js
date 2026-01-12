import { useContext } from 'react';
import { MusicContext } from '../MusicContext';
import SongCard from '../components/SongCard';

function Liked() {
  const { songs, likedSongs, playQueue } = useContext(MusicContext);
  const likedSongsDetails = songs.filter(song => likedSongs.has(song.id));

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="mb-10">
        <h2 className="text-5xl font-bold mb-2 text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Liked Songs
        </h2>
        <p className="text-gray-400 text-center">Your collection of favorite tracks</p>
      </div>
      {likedSongsDetails.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {likedSongsDetails.map((song, index) => (
            <SongCard key={song.id} song={song} onPlay={() => playQueue(likedSongsDetails, index)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
          <p className="text-gray-400 text-lg">You haven't liked any songs yet.</p>
          <p className="text-gray-500 text-sm mt-2">Start exploring and like your favorite tracks!</p>
        </div>
      )}
    </div>
  )
}

export default Liked
