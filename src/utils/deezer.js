import jsonp from './jsonp';

// Map Deezer API track to our internal track shape
function mapTrack(t) {
  return {
    id: t.id,
    title: t.title,
    name: `${t.title} - ${t.artist?.name ?? ''}`.trim(),
    src: t.preview, // 30s MP3 preview
    artist: t.artist?.name ?? '',
    album: t.album?.title ?? '',
    cover: t.album?.cover_small ?? t.album?.cover ?? '',
    duration: t.duration || 30,
  };
}

export async function dzSearch(query, limit = 25) {
  if (!query || !query.trim()) return [];
  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=${limit}&output=jsonp`;
  const data = await jsonp(url);
  const list = Array.isArray(data?.data) ? data.data : [];
  return list.map(mapTrack).filter(t => !!t.src);
}

export async function dzTopTracks(limit = 25) {
  const url = `https://api.deezer.com/chart/0/tracks?limit=${limit}&output=jsonp`;
  const data = await jsonp(url);
  const list = Array.isArray(data?.data) ? data.data : (Array.isArray(data?.tracks?.data) ? data.tracks.data : []);
  return list.map(mapTrack).filter(t => !!t.src);
}
