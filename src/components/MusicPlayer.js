import { useContext, useRef, useEffect, useState } from 'react';
import { MusicContext } from '../MusicContext';

function MusicPlayer() {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious, likedSongs, toggleLike } = useContext(MusicContext);
  const audioRef = useRef(new Audio());
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const isLiked = currentSong ? likedSongs.has(currentSong.id) : false;

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.audioSrc;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error('Audio play failed:', e));
      }
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    isPlaying ? audioRef.current.play().catch(e => console.error('Audio play failed:', e)) : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => setProgress(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);
    const handleSongEnd = () => playNext();

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);
    audio.addEventListener('ended', handleSongEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
      audio.removeEventListener('ended', handleSongEnd);
    };
  }, [playNext]);

  const handleProgressChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setProgress(e.target.value);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!currentSong) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900 to-gray-800/95 backdrop-blur-lg border-t border-gray-700/50 p-4 flex items-center justify-between text-white shadow-2xl z-50">
      <div className="flex items-center w-1/4 min-w-[200px]">
        <div className="relative group">
          <img 
            src={currentSong.albumArt} 
            alt={currentSong.title} 
            className="w-16 h-16 object-cover rounded-lg mr-4 shadow-xl transition-transform duration-300 group-hover:scale-105" 
          />
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate text-sm">{currentSong.title}</h3>
          <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
        </div>
        <button 
          onClick={() => toggleLike(currentSong.id)} 
          className="ml-3 p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-200 flex-shrink-0"
          aria-label={isLiked ? 'Unlike song' : 'Like song'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors duration-200 ${isLiked ? 'text-green-400 fill-green-400' : 'text-gray-400'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 max-w-2xl px-4">
        <div className="flex items-center space-x-6 mb-3">
          <button 
            onClick={playPrevious} 
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-200 active:scale-95"
            aria-label="Previous song"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>
          <button 
            onClick={togglePlay} 
            className="p-4 rounded-full bg-green-500 text-black hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 active:scale-95 shadow-lg"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button 
            onClick={playNext} 
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-200 active:scale-95"
            aria-label="Next song"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 6h2v12h-2zm-4.5 6L6 6v12z"/>
            </svg>
          </button>
        </div>
        <div className="flex items-center w-full space-x-3">
          <span className="text-xs text-gray-400 min-w-[40px] text-right">{formatTime(progress)}</span>
          <input 
            type="range" 
            min="0" 
            max={duration || 0} 
            value={progress} 
            onChange={handleProgressChange} 
            className="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer slider" 
          />
          <span className="text-xs text-gray-400 min-w-[40px]">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-end w-1/4 min-w-[150px]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" />
        </svg>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={handleVolumeChange} 
          className="w-24 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer slider" 
          aria-label="Volume"
        />
      </div>
    </div>
  );
}

export default MusicPlayer;