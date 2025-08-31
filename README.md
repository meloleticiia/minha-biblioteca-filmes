# Minha Biblioteca de Filmes

Uma aplicação moderna em **React** para descobrir, pesquisar e organizar seus filmes favoritos usando a **API do The Movie Database (TMDB)**.

## Funcionalidades

- **Busca avançada**: pesquise filmes por título com paginação  
- **Filmes em alta**: descubra os filmes mais populares do momento  
- **Favoritos**: salve seus filmes preferidos localmente  
- **Detalhes completos**: veja informações detalhadas incluindo:  
  - Sinopse e avaliação  
  - Diretor e elenco principal  
  - Data de lançamento e duração  
  - Gêneros  
- **Design responsivo**: interface adaptada para desktop e mobile  
- **Tema escuro**: interface moderna com efeitos *glassmorphism*  

## Tecnologias

- **React** – Biblioteca JavaScript para interfaces  
- **Axios** – Cliente HTTP para requisições à API  
- **Lucide React** – Biblioteca de ícones moderna  
- **TMDB API** – Base de dados de filmes  
- **CSS3** – Estilização com *glassmorphism* e animações  

## Como executar o projeto

### Pré-requisitos  
- **Node.js** (versão 14 ou superior)  
- **npm** ou **yarn**  
- **Chave da API do TMDB** (gratuita)  

### Passo a passo  

**1. Clone o repositório**  
```bash
git clone https://github.com/seu-usuario/minha-biblioteca-filmes.git
cd minha-biblioteca-filmes
```

**2. Instale as dependências**  
```bash
npm install
```

**3. Configure as variáveis de ambiente**  
Copie o arquivo de exemplo:  
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais:  
```env
REACT_APP_API_KEY=sua_api_key_aqui
REACT_APP_API_URL=https://api.themoviedb.org/3
REACT_APP_IMG_BASE=https://image.tmdb.org/t/p/w500
```

**4. Execute o projeto**  
```bash
npm start
```

**5. Acesse a aplicação**  
http://localhost:3000

## Obtendo a API Key do TMDB

1. Acesse https://www.themoviedb.org  
2. Crie uma conta gratuita  
3. Vá em Settings > API  
4. Solicite uma **API Key** (aprovação instantânea)  
5. Copie a chave e cole no arquivo `.env`  

## Estrutura do projeto

```
src/
├── components/
│   └── MovieCard.js      # Componente do card de filme
├── services/
│   └── tmdb.js           # Serviços da API TMDB
├── App.js                # Componente principal
├── App.css               # Estilos globais
└── index.js              # Ponto de entrada
```

## Como usar

- **Buscar filmes**: digite o nome de um filme e clique em "Buscar"  
- **Ver em alta**: clique em "Em alta hoje" para ver filmes populares  
- **Adicionar aos favoritos**: clique no ícone de coração nos cards  
- **Ver detalhes**: clique em qualquer filme para ver informações completas  
- **Navegar páginas**: use os botões **Anterior** e **Próxima** nos resultados  

