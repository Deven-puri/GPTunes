import { useState, useContext, useEffect } from 'react';
import { MusicContext } from '../MusicContext';
import SongCard from '../components/SongCard';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const { songs, playQueue, searchSongs, loading, error } = useContext(MusicContext);
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        searchSongs(localSearchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchTerm, searchSongs]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    setSearchTerm(value);
  };

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for songs or artists..."
            className="w-full p-4 pl-12 bg-gray-800/80 backdrop-blur-sm rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-gray-800 transition-all duration-300 shadow-lg"
            value={localSearchTerm}
            onChange={handleSearchChange}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : filteredSongs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredSongs.map((song, index) => (
            <SongCard key={song.id} song={song} onPlay={() => playQueue(filteredSongs, index)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No songs found. Try searching for something else.</p>
        </div>
      )}
    </div>
  )
}

export default Search
