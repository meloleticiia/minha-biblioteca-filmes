import { Film, Star, Heart } from 'lucide-react'


const IMG_BASE = process.env.REACT_APP_IMG_BASE

export default function MovieCard({
  movie,
  onOpen,
  ehFavorito,
  adicionarFavorito,
  removerFavorito
}) {
  const hasPoster = Boolean(movie.poster_path)
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const favorito = ehFavorito?.(movie.id) ?? false

  return (
    <div className="movie-card" onClick={onOpen} style={{ position: 'relative' }}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          favorito ? removerFavorito?.(movie.id) : adicionarFavorito?.(movie)
        }}
        className={`fav-btn ${favorito ? 'is-active' : ''}`}
        title={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Heart
          size={16}
          strokeWidth={2}
          fill={favorito ? 'currentColor' : 'none'}
        />
      </button>

      {hasPoster ? (
        <img
          src={`${IMG_BASE}${movie.poster_path}`}
          alt={`Poster de ${movie.title}`}
          loading="lazy"
        />
      ) : (
        <div className="sem-poster" style={{ width: '100%', height: 270 }}>
          <Film size={32} />
          <br />Sem imagem
        </div>
      )}

      <div className="info">
        <h3 title={movie.title}>{movie.title}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="year">{year}</span>
          {rating !== 'N/A' && (
            <span
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
                color: '#2d3748',
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: '8px',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(255, 215, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              <Star size={12} fill="currentColor" />
              {rating}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}