import React from 'react';

const PlayerModal = ({ movieId, mediaType = 'movie', onClose }) => {
  if (!movieId) return null;

  // TMDB ID से फ्री एम्बेड प्लेयर की लिंक
  const streamUrl = mediaType === 'tv' 
    ? `https://vidsrc.to/embed/tv/${movieId}/1/1` 
    : `https://vidsrc.to/embed/movie/${movieId}`;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ position: 'relative', width: '90%', maxWidth: '1000px', height: '80vh' }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '-40px', right: '0', color: '#fff',
            fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ✕ Close
        </button>
        
        {/* Free Video Stream Player */}
        <iframe
          src={streamUrl}
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
          allowFullScreen
          title="Movie Player"
        ></iframe>
      </div>
    </div>
  );
};

export default PlayerModal;
