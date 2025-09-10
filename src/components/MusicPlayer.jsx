import { useState, useEffect, useMemo } from 'react';
import { Play, Pause, SkipForward, SkipBack, Square, Minus, Maximize2, X } from 'lucide-react';
import { dzSearch, dzTopTracks } from '../utils/deezer';

export default function MusicPlayer({ onMinimize, onClose, showChrome = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showEqualizer, setShowEqualizer] = useState(true);
  const [audio, setAudio] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [source, setSource] = useState('Local'); // 'Local' | 'Deezer'
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  // lyrics removed per request

  // Retro music tracks with actual audio files
  // Build playlist from actual files under src/assets/music using Vite glob
  // Load local tracks once on mount
  useEffect(() => {
    const files = import.meta.glob('../assets/music/*.{mp3,ogg,m4a,wav}', { eager: true });
    const list = Object.entries(files).map(([path, mod]) => {
      const url = (mod && (mod.default || mod)) || '';
      const name = path.split('/').pop() || 'TRACK.MP3';
      return { name: name.toUpperCase(), src: url };
    });
    setTracks(list);
    setSource('Local');
  }, []);

  // Audio element for real music playback
  // Remove oscillator/beep fallback entirely – play only real files

  // Initialize audio when component mounts
  useEffect(() => {
    const audioElement = new Audio();
    audioElement.volume = volume / 100;
    audioElement.addEventListener('ended', nextTrack);
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('loadedmetadata', updateDuration);
    setAudio(audioElement);

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.removeEventListener('ended', nextTrack);
        audioElement.removeEventListener('timeupdate', updateProgress);
        audioElement.removeEventListener('loadedmetadata', updateDuration);
      }
  // nothing extra to cleanup
    };
  }, []);

  // Update audio source when track changes
  useEffect(() => {
    if (!audio || !tracks.length) return;
    const index = Math.max(0, Math.min(currentTrack, tracks.length - 1));
    const t = tracks[index];
    if (!t) return;
    audio.src = t.src;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  // lyrics loading removed
  }, [currentTrack, audio, tracks, isPlaying]);

  const updateProgress = () => {
    if (audio) {
      setCurrentTime(Math.floor(audio.currentTime));
    }
  };

  const updateDuration = () => {
    if (audio) {
      setDuration(Math.floor(audio.duration));
    }
  };

  // No beep fallback

  // Handle actual audio playback
  const handlePlay = () => {
    if (!audio || !tracks.length) return;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const handlePause = () => {
    if (audio) audio.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const stopTrack = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const nextTrack = () => {
    stopTrack();
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setCurrentTime(0);
    setTimeout(() => handlePlay(), 100);
  };

  const prevTrack = () => {
    stopTrack();
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setCurrentTime(0);
    setTimeout(() => handlePlay(), 100);
  };

  // Update volume
  useEffect(() => {
    if (audio) audio.volume = volume / 100;
  }, [volume, audio]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMinimize = () => {
    if (onMinimize) onMinimize();
  };

  const handleClose = () => {
    stopTrack();
    if (onClose) onClose();
  };

  // Deezer actions
  const loadTop = async () => {
    setLoading(true);
    try {
      const list = await dzTopTracks(25);
      if (Array.isArray(list) && list.length) {
        stopTrack();
        setTracks(list.map(t => ({ name: t.name.toUpperCase(), src: t.src })));
        setSource('Deezer');
        setCurrentTrack(0);
        setTimeout(() => handlePlay(), 200);
      }
    } finally {
      setLoading(false);
    }
  };

  const doSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const list = await dzSearch(search.trim(), 25);
      stopTrack();
      setTracks(list.map(t => ({ name: t.name.toUpperCase(), src: t.src })));
      setSource('Deezer');
      setCurrentTrack(0);
      setTimeout(() => handlePlay(), 200);
    } finally {
      setLoading(false);
    }
  };

  const resetLocal = () => {
    const files = import.meta.glob('../assets/music/*.{mp3,ogg,m4a,wav}', { eager: true });
    const list = Object.entries(files).map(([path, mod]) => {
      const url = (mod && (mod.default || mod)) || '';
      const name = path.split('/').pop() || 'TRACK.MP3';
      return { name: name.toUpperCase(), src: url };
    });
    stopTrack();
    setTracks(list);
    setSource('Local');
    setCurrentTrack(0);
  };

  // On first ready, try Deezer Top 25, else fallback to Local and autoplay
  useEffect(() => {
    if (!audio) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const list = await dzTopTracks(25);
        if (!cancelled && Array.isArray(list) && list.length) {
          stopTrack();
          setTracks(list.map(t => ({ name: t.name.toUpperCase(), src: t.src })));
          setSource('Deezer');
          setCurrentTrack(0);
          setTimeout(() => handlePlay(), 200);
          return;
        }
      } catch (_) {
        // ignore and fallback
      } finally {
        if (!cancelled) setLoading(false);
      }

      if (!cancelled) {
        // Fallback to whatever local tracks are loaded
        if (tracks.length > 0) {
          setCurrentTrack(0);
          setTimeout(() => handlePlay(), 200);
        }
      }
    })();
    return () => { cancelled = true; };
  // deliberately do not include `tracks` to avoid refiring after user actions
  }, [audio]);

  // lyrics logic removed

  // Equalizer bars animation
  const EqualizerBar = ({ height }) => (
    <div 
      className={`w-1 bg-green-400 transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
      style={{ height: `${isPlaying ? Math.random() * 40 + 10 : 5}px` }}
    />
  );

  // Internal minimized tile removed; App controls minimized state

  return (
  <div className="w-[92vw] sm:w-[640px] max-w-full bg-gray-300 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 p-1">
      
  {/* Title Bar (optional) */}
  {showChrome && (
      <div className="bg-gray-700 text-white text-sm font-bold p-1 mb-2 flex justify-between items-center">
        <span>🎵 WinAmp Classic - Ankita's Playlist</span>
        <div className="flex gap-1">
          <button 
            onClick={handleMinimize}
            className="bg-gray-600 hover:bg-gray-500 px-2 text-xs border border-gray-400"
          >
            <Minus size={12} />
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 px-2 text-xs border border-gray-400">
            <Maximize2 size={12} />
          </button>
          <button 
            onClick={handleClose}
            className="bg-red-600 hover:bg-red-500 px-2 text-xs border border-gray-400"
          >
            <X size={12} />
          </button>
        </div>
      </div>
    )}

  {/* Main Display */}
      <div className="bg-black p-3 mb-2 border border-gray-600">
        <div className="text-green-400 font-mono text-base sm:text-lg text-center">
          {isPlaying ? '♪ ♫ ♪ ♫' : '- - - -'}
        </div>
        <div className="text-green-400 font-mono text-center mt-1 text-xs sm:text-sm truncate">
          {tracks[currentTrack]?.name}
        </div>
        <div className="text-green-400 font-mono text-center text-xs sm:text-sm">
          {formatTime(currentTime)}{duration ? ` / ${formatTime(duration)}` : ''}
        </div>
      </div>

  {/* Equalizer */}
      {showEqualizer && (
        <div className="bg-black p-2 mb-2 border border-gray-600">
          <div className="flex justify-center items-end gap-1 h-16">
            {Array.from({ length: 20 }, (_, i) => (
              <EqualizerBar key={i} height={40} />
            ))}
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex justify-center gap-2 mb-3">
        <button
          onClick={prevTrack}
          className="bg-gray-400 hover:bg-gray-300 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600 p-2"
        >
          <SkipBack size={16} />
        </button>
        
        <button
          onClick={togglePlay}
          className="bg-gray-400 hover:bg-gray-300 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600 p-2"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        
        <button
          onClick={stopTrack}
          className="bg-gray-400 hover:bg-gray-300 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600 p-2"
        >
          <Square size={16} />
        </button>
        
        <button
          onClick={nextTrack}
          className="bg-gray-400 hover:bg-gray-300 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600 p-2"
        >
          <SkipForward size={16} />
        </button>
      </div>

      {/* Volume and Controls */}
    <div className="flex items-center gap-3 sm:gap-4 mb-3 px-3 sm:px-4 flex-wrap">
        <span className="text-sm font-bold">Vol:</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
      onChange={(e) => setVolume(e.target.value)}
      className="flex-[1_1_160px] h-2"
        />
        <span className="text-sm font-mono w-8">{volume}</span>
        
        <button
          onClick={() => setShowEqualizer(!showEqualizer)}
          className="bg-gray-400 hover:bg-gray-300 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600 px-2 py-1 text-xs"
        >
          EQ
        </button>
      </div>

      {/* Search & Source Controls */}
      <div className="flex items-center gap-2 px-3 mb-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && doSearch()}
          placeholder="Search Deezer (artist, song, album)"
          className="flex-1 border border-gray-400 px-2 py-1 text-sm"
        />
        <button
          onClick={doSearch}
          className="bg-gray-400 hover:bg-gray-300 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600 px-2 py-1 text-xs"
        >
          Search
        </button>
        <button
          onClick={loadTop}
          className="bg-gray-400 hover:bg-gray-300 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600 px-2 py-1 text-xs"
        >
          Top 25
        </button>
        <button
          onClick={resetLocal}
          className="bg-gray-400 hover:bg-gray-300 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600 px-2 py-1 text-xs"
        >
          Local
        </button>
      </div>

      {/* Playlist */}
  <div className="bg-white border border-gray-600 h-40 md:h-48 overflow-y-auto">
        <div className="bg-gray-200 text-black text-xs font-bold p-1 border-b border-gray-400">
          {source}: PLAYLIST - {tracks.length} track{tracks.length === 1 ? '' : 's'} {loading ? ' • Loading…' : ''}
        </div>
        {tracks.length === 0 && (
          <div className="p-2 text-xs text-gray-600">
            {source === 'Local' ? (
              <>
                No music files found. Add MP3/OGG/M4A/WAV files to <span className="font-mono">src/assets/music</span> or try Deezer search.
              </>
            ) : (
              <>No results. Try another search.</>
            )}
          </div>
        )}
        {tracks.map((track, index) => (
          <div
            key={index}
            onClick={() => {
              stopTrack();
              setCurrentTrack(index);
              setCurrentTime(0);
              setTimeout(() => handlePlay(), 100);
            }}
            className={`p-1 text-xs cursor-pointer hover:bg-blue-100 flex justify-between ${
              index === currentTrack ? 'bg-blue-200 font-bold' : ''
            }`}
          >
            <span>{index + 1}. {track.name}</span>
            <span>{index === currentTrack && duration ? formatTime(duration) : ''}</span>
          </div>
        ))}
      </div>

  {/* Lyrics removed */}

      {/* Status Bar */}
      <div className="bg-gray-200 border-t border-gray-400 p-1 mt-2">
        <div className="text-xs">
          {isPlaying ? '▶️ Playing' : '⏸️ Paused'} • Track {currentTrack + 1} of {tracks.length} • Stereo 44kHz
        </div>
      </div>
    </div>
  );
}
