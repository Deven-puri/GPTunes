const PROXY_BASE = process.env.REACT_APP_PROXY_URL || 'http://localhost:3002/api/genius';

const getAudioSource = (songId) => {
  const demoSongs = [
    'https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3',
    'https://www.bensound.com/bensound-music/bensound-anewbeginning.mp3',
    'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
    'https://www.bensound.com/bensound-music/bensound-cute.mp3',
    'https://www.bensound.com/bensound-music/bensound-goinghigher.mp3',
    'https://www.bensound.com/bensound-music/bensound-happyrock.mp3',
    'https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3',
    'https://www.bensound.com/bensound-music/bensound-littleidea.mp3',
    'https://www.bensound.com/bensound-music/bensound-memories.mp3',
    'https://www.bensound.com/bensound-music/bensound-summer.mp3',
  ];
  const idNum = typeof songId === 'number' ? songId : parseInt(String(songId).replace(/\D/g, '')) || 0;
  return demoSongs[idNum % demoSongs.length];
};

const mapSongsFromResponse = (hits, limit) => {
  return hits
    .filter(hit => hit.type === 'song')
    .slice(0, limit)
    .map((hit, index) => {
      const song = hit.result;
      const primaryArtist = song.primary_artist;
      return {
        id: song.id || `genius-${index}`,
        title: song.title || 'Unknown Title',
        artist: primaryArtist?.name || 'Unknown Artist',
        albumArt: song.song_art_image_url || song.header_image_url || 'https://via.placeholder.com/300',
        audioSrc: getAudioSource(song.id || index),
        duration: 0,
        album: song.album?.name || 'Unknown Album',
      };
    })
    .filter(song => song.title && song.title !== 'Unknown Title');
};

export const searchDeezerSongs = async (query = '', limit = 50) => {
  try {
    if (!query.trim()) {
      return await getTrendingSongs(limit);
    }

    const response = await fetch(`${PROXY_BASE}/search?q=${encodeURIComponent(query)}&limit=${limit}`, {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (data.response?.hits?.length > 0) {
      return mapSongsFromResponse(data.response.hits, limit);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching from Genius API:', error);
    return [];
  }
};

export const getTrendingSongs = async (limit = 50) => {
  try {
    const popularQueries = ['popular', 'chart', 'top', 'hit', 'trending'];
    const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
    
    const response = await fetch(`${PROXY_BASE}/search?q=${encodeURIComponent(randomQuery)}&limit=${limit}`, {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (data.response?.hits?.length > 0) {
      return mapSongsFromResponse(data.response.hits, limit);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching trending songs from Genius:', error);
    return [];
  }
};
