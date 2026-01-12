import { createContext, useState, useEffect, useCallback } from 'react';
import { getTrendingSongs, searchDeezerSongs } from './services/musicApi';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songQueue, setSongQueue] = useState([]);
  const [likedSongs, setLikedSongs] = useState(() => {
    try {
      const stored = localStorage.getItem('likedSongs');
      return new Set(JSON.parse(stored || '[]'));
    } catch {
      return new Set();
    }
  });
  const [playlistSongs, setPlaylistSongs] = useState(() => {
    try {
      const stored = localStorage.getItem('playlistSongs');
      const storedSongs = JSON.parse(stored || '[]');
      return new Map(storedSongs.map(song => [song.id, song]));
    } catch {
      return new Map();
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiSongs = await getTrendingSongs(50);
        if (apiSongs && apiSongs.length > 0) {
          setSongs(apiSongs);
        }
      } catch (err) {
        console.error('Failed to load songs from API:', err);
        setError('Failed to load songs. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadSongs();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('likedSongs', JSON.stringify(Array.from(likedSongs)));
    } catch (err) {
      console.error('Failed to save liked songs:', err);
    }
  }, [likedSongs]);

  useEffect(() => {
    try {
      const songsArray = Array.from(playlistSongs.values());
      localStorage.setItem('playlistSongs', JSON.stringify(songsArray));
    } catch (err) {
      console.error('Failed to save playlist songs:', err);
    }
  }, [playlistSongs]);

  const currentSong = currentSongIndex !== null ? songQueue[currentSongIndex] : null;

  const searchSongs = useCallback(async (query) => {
    if (!query.trim()) {
      const trending = await getTrendingSongs(50);
      if (trending && trending.length > 0) {
        setSongs(trending);
      }
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const results = await searchDeezerSongs(query, 50);
      if (results && results.length > 0) {
        setSongs(results);
      } else {
        setError('No songs found. Try a different search term.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const playQueue = useCallback((queue, index) => {
    setSongQueue(queue);
    setCurrentSongIndex(index);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  }, [currentSong, isPlaying]);

  const playNext = useCallback(() => {
    if (songQueue.length > 0) {
      const nextIndex = (currentSongIndex + 1) % songQueue.length;
      setCurrentSongIndex(nextIndex);
      setIsPlaying(true);
    }
  }, [currentSongIndex, songQueue]);

  const playPrevious = useCallback(() => {
    if (songQueue.length > 0) {
      const prevIndex = (currentSongIndex - 1 + songQueue.length) % songQueue.length;
      setCurrentSongIndex(prevIndex);
      setIsPlaying(true);
    }
  }, [currentSongIndex, songQueue]);

  const toggleLike = useCallback((songId) => {
    setLikedSongs(prevLikedSongs => {
      const newLikedSongs = new Set(prevLikedSongs);
      if (newLikedSongs.has(songId)) {
        newLikedSongs.delete(songId);
      } else {
        newLikedSongs.add(songId);
      }
      return newLikedSongs;
    });
  }, []);

  const addToPlaylist = useCallback((song) => {
    setPlaylistSongs(prevPlaylist => {
      const newPlaylist = new Map(prevPlaylist);
      newPlaylist.set(song.id, song);
      return newPlaylist;
    });
  }, []);

  const removeFromPlaylist = useCallback((songId) => {
    setPlaylistSongs(prevPlaylist => {
      const newPlaylist = new Map(prevPlaylist);
      newPlaylist.delete(songId);
      return newPlaylist;
    });
  }, []);

  const isInPlaylist = useCallback((songId) => {
    return playlistSongs.has(songId);
  }, [playlistSongs]);

  const value = { 
    songs, 
    currentSong, 
    isPlaying, 
    playQueue, 
    togglePlay, 
    playNext, 
    playPrevious, 
    likedSongs, 
    toggleLike,
    searchSongs,
    loading,
    error,
    playlistSongs: Array.from(playlistSongs.values()),
    addToPlaylist,
    removeFromPlaylist,
    isInPlaylist
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};