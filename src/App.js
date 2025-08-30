import axios from 'axios'
import {
  ArrowRight,
  ChevronLeft,
  Heart,
  Search,
  TrendingUp,
  X,
  Film,
  Loader2,
  AlertCircle,
  Calendar,
  Star,
  Clock3,
  User,
  Users,
  FileText,
  Tags
} from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard'
import { trendingMovies } from './services/tmdb'

const API_KEY = process.env.REACT_APP_API_KEY
const IMG_BASE = process.env.REACT_APP_IMG_BASE
const API_URL = process.env.REACT_APP_API_URL

function App() {
  const [busca, setBusca] = useState('')
  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(false)
  const [filmeSelecionado, setFilmeSelecionado] = useState(null)
  const [detalhesFilme, setDetalhesFilme] = useState(null)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [favoritos, setFavoritos] = useState([])
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const favsSalvos = localStorage.getItem('filmesFavoritos')
    if (favsSalvos) setFavoritos(JSON.parse(favsSalvos))
  }, [])

  const salvarFavoritos = (novosFavs) => {
    setFavoritos(novosFavs)
    localStorage.setItem('filmesFavoritos', JSON.stringify(novosFavs))
  }

  const adicionarFavorito = (filme) => {
    const jaExiste = favoritos.find((f) => f.id === filme.id)
    if (!jaExiste) salvarFavoritos([...favoritos, filme])
  }

  const removerFavorito = (filmeId) => {
    const novosFavs = favoritos.filter((f) => f.id !== filmeId)
    salvarFavoritos(novosFavs)
  }

  const ehFavorito = (filmeId) => favoritos.some((f) => f.id === filmeId)

  const handleEmAlta = async () => {
    setLoading(true)
    setErro('')
    try {
      const lista = await trendingMovies()
      setFilmes(lista)
      setFilmeSelecionado(null)
      setMostrarFavoritos(false)
      setPaginaAtual(1)
      setTotalPaginas(0)
    } catch {
      setErro('Erro ao carregar filmes em alta')
    } finally {
      setLoading(false)
    }
  }

  const handleBusca = async (pagina = 1) => {
    if (!busca.trim()) return
    setLoading(true)
    setErro('')

    try {
      const resposta = await axios.get(
        `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          busca
        )}&page=${pagina}&language=pt-BR`
      )
      setFilmes(resposta.data.results)
      setPaginaAtual(pagina)
      setTotalPaginas(resposta.data.total_pages)
      setMostrarFavoritos(false)
      setFilmeSelecionado(null)
    } catch {
      setErro('Erro ao buscar filmes. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const buscarDetalhes = async (filmeId) => {
    setLoading(true)
    try {
      const [detalhes, creditos] = await Promise.all([
        axios.get(`${API_URL}/movie/${filmeId}?api_key=${API_KEY}&language=pt-BR`),
        axios.get(`${API_URL}/movie/${filmeId}/credits?api_key=${API_KEY}`)
      ])

      setDetalhesFilme({
        ...detalhes.data,
        diretor: creditos.data.crew.find((pessoa) => pessoa.job === 'Director')?.name || 'N/A',
        elenco:
          creditos.data.cast.slice(0, 5).map((ator) => ator.name).join(', ') || 'N/A'
      })
    } catch {
      setErro('Erro ao carregar detalhes do filme')
    } finally {
      setLoading(false)
    }
  }

  const abrirDetalhes = (filme) => {
    setFilmeSelecionado(filme)
    buscarDetalhes(filme.id)
  }

  const voltarLista = () => {
    setFilmeSelecionado(null)
    setDetalhesFilme(null)
  }

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) handleBusca(paginaAtual + 1)
  }

  const paginaAnterior = () => {
    if (paginaAtual > 1) handleBusca(paginaAtual - 1)
  }

  return (
    <div className="app">
      <header
        style={{
          borderBottom: '1px solid #ddd',
          paddingBottom: '16px',
          marginBottom: '20px'
        }}
      >
        <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Film size={34} />
          Minha Biblioteca de Filmes
        </h1>

        <div style={{ marginBottom: '10px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite o nome do filme..."
            onKeyDown={(e) => { if (e.key === 'Enter') handleBusca() }}
            className="input"
          />

          <button className="btn btn--primary" onClick={() => handleBusca()} disabled={!busca.trim()}>
            <Search size={16} />
            <span>Buscar</span>
          </button>

          <button className="btn btn--secondary" onClick={handleEmAlta}>
            <TrendingUp size={16} />
            <span>Em alta hoje</span>
          </button>

          <button
            className={`btn ${mostrarFavoritos ? 'btn--primary' : 'btn--neutral'}`}
            onClick={() => setMostrarFavoritos(!mostrarFavoritos)}
          >
            <Heart size={16} />
            <span>Favoritos ({favoritos.length})</span>
          </button>
        </div>

        {erro && (
          <p style={{ color: 'red', margin: '10px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertCircle size={16} />
            {erro}
          </p>
        )}
      </header>

      {loading && (
        <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Loader2 size={18} className="spin" />
          <span className="loading">Carregando...</span>
        </p>
      )}

      {filmeSelecionado && detalhesFilme && !loading && (
        <div className="detalhes" style={{ maxWidth: '800px', margin: '20px 0' }}>
          <button onClick={voltarLista} className="btn btn--neutral" style={{ marginBottom: 15 }}>
            <ChevronLeft size={16} />
            <span>Voltar</span>
          </button>

          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            {detalhesFilme.poster_path ? (
              <img
                src={`${IMG_BASE}${detalhesFilme.poster_path}`}
                alt={detalhesFilme.title}
                width={300}
                height={450}
              />
            ) : (
              <div
                style={{
                  width: 300,
                  height: 450,
                  background: '#eee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Film size={22} style={{ marginRight: 6 }} />
                Sem imagem
              </div>
            )}

            <div style={{ flex: 1 }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Film size={18} />
                {detalhesFilme.title}
              </h2>

              <div style={{ marginBottom: 15 }}>
                <button
                  onClick={() =>
                    ehFavorito(detalhesFilme.id)
                      ? removerFavorito(detalhesFilme.id)
                      : adicionarFavorito(detalhesFilme)
                  }
                  className="btn"
                  style={{
                    background: ehFavorito(detalhesFilme.id) ? '#dc3545' : '#28a745',
                    color: 'white'
                  }}
                >
                  {ehFavorito(detalhesFilme.id) ? <X size={16} /> : <Heart size={16} />}
                  <span>{ehFavorito(detalhesFilme.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}</span>
                </button>
              </div>

              <p className="row">
                <User size={16} />
                <strong>Diretor:</strong> {detalhesFilme.diretor}
              </p>
              <p className="row">
                <Users size={16} />
                <strong>Elenco:</strong> {detalhesFilme.elenco}
              </p>
              <p className="row">
                <FileText size={16} />
                <strong>Sinopse:</strong> {detalhesFilme.overview || 'Sem descrição disponível'}
              </p>
              <p className="row">
                <Calendar size={16} />
                <strong>Data de lançamento:</strong> {detalhesFilme.release_date || 'N/A'}
              </p>
              <p className="row">
                <Star size={16} />
                <strong>Avaliação:</strong> {detalhesFilme.vote_average ? `${detalhesFilme.vote_average}/10` : 'N/A'}
              </p>
              <p className="row">
                <Clock3 size={16} />
                <strong>Duração:</strong> {detalhesFilme.runtime ? `${detalhesFilme.runtime} min` : 'N/A'}
              </p>
              <p className="row">
                <Tags size={16} />
                <strong>Gêneros:</strong> {detalhesFilme.genres?.map((g) => g.name).join(', ') || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}

      {mostrarFavoritos && !filmeSelecionado && (
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Heart size={20} />
            Meus Filmes Favoritos
          </h2>
          {favoritos.length === 0 ? (
            <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <AlertCircle size={16} />
              Você ainda não tem filmes favoritos
            </p>
          ) : (
            <div className="filmes-lista">
              {favoritos.map((filme) => (
                <MovieCard
                  key={filme.id}
                  movie={filme}
                  onOpen={() => abrirDetalhes(filme)}
                  ehFavorito={ehFavorito}
                  adicionarFavorito={adicionarFavorito}
                  removerFavorito={removerFavorito}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {!filmeSelecionado && !mostrarFavoritos && filmes.length > 0 && (
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Film size={20} />
            Resultados da busca:
          </h2>
          <div className="filmes-lista">
            {filmes.map((filme) => (
              <MovieCard
                key={filme.id}
                movie={filme}
                onOpen={() => abrirDetalhes(filme)}
                ehFavorito={ehFavorito}
                adicionarFavorito={adicionarFavorito}
                removerFavorito={removerFavorito}
              />
            ))}
          </div>

          {totalPaginas > 1 && (
            <div style={{ margin: '20px 0', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <button
                onClick={paginaAnterior}
                disabled={paginaAtual <= 1}
                className="btn btn--neutral"
              >
                <ChevronLeft size={16} />
                <span>Anterior</span>
              </button>
              <span> Página {paginaAtual} de {totalPaginas} </span>
              <button
                onClick={proximaPagina}
                disabled={paginaAtual >= totalPaginas}
                className="btn btn--neutral"
              >
                <span>Próxima</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App