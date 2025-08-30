import { useState, useEffect } from 'react'
import { TrendingUp } from 'lucide-react'
import MovieCard from './MovieCard'

export default function Row({ title, fetchFn, onOpenDetails }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function carregar() {
      setLoading(true)
      try {
        const lista = await fetchFn() 
        setItems(lista)
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [fetchFn])

  return (
    <section style={{ marginTop: 16 }}>
      <h2>
        <TrendingUp size={20} className="inline mr-2" />
        {title}
      </h2>

      {loading && <p className="loading">Carregando...</p>}
      {!loading && items.length === 0 && <p>Sem itens</p>}

      {!loading && items.length > 0 && (
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
          {items.map((filme) => (
            <MovieCard
              key={filme.id}
              movie={filme}
              onOpen={() => onOpenDetails(filme)}
            />
          ))}
        </div>
      )}
    </section>
  )
}