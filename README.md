Minha Biblioteca de Filmes
Uma aplicação moderna em React para descobrir, pesquisar e organizar seus filmes favoritos usando a API do The Movie Database (TMDB).
Funcionalidades

Busca avançada: Pesquise filmes por título com paginação
Filmes em alta: Descubra os filmes mais populares do momento
Favoritos: Salve seus filmes preferidos localmente
Detalhes completos: Veja informações detalhadas incluindo:

Sinopse e avaliação
Diretor e elenco principal
Data de lançamento e duração
Gêneros


Design responsivo: Interface adaptada para desktop e mobile
Tema escuro: Interface moderna com efeitos glassmorphism

Tecnologias

React - Biblioteca JavaScript para interfaces
Axios - Cliente HTTP para requisições à API
Lucide React - Biblioteca de ícones moderna
TMDB API - Base de dados de filmes
CSS3 - Estilização com glassmorphism e animações

Como executar o projeto
Pré-requisitos

Node.js (versão 14 ou superior)
npm ou yarn
Chave da API do TMDB (gratuita)

Passo a passo

Clone o repositório
bashgit clone https://github.com/seu-usuario/minha-biblioteca-filmes.git
cd minha-biblioteca-filmes

Instale as dependências
bashnpm install

Configure as variáveis de ambiente
Copie o arquivo de exemplo:
bashcp .env.example .env
Edite o arquivo .env e adicione suas credenciais:
envREACT_APP_API_KEY=sua_api_key_aqui
REACT_APP_API_URL=https://api.themoviedb.org/3
REACT_APP_IMG_BASE=https://image.tmdb.org/t/p/w500

Execute o projeto
bashnpm start

Acesse a aplicação
Abra http://localhost:3000 no seu navegador

Obtendo a API Key do TMDB

Acesse themoviedb.org
Crie uma conta gratuita
Vá em Settings > API
Solicite uma API Key (aprovação instantânea)
Copie a chave e cole no arquivo .env

Estrutura do projeto
src/
├── components/
│   └── MovieCard.js      # Componente do card de filme
├── services/
│   └── tmdb.js          # Serviços da API TMDB
├── App.js               # Componente principal
├── App.css              # Estilos globais
└── index.js             # Ponto de entrada
Como usar

Buscar filmes: Digite o nome de um filme e clique em "Buscar"
Ver em alta: Clique em "Em alta hoje" para ver filmes populares
Adicionar aos favoritos: Clique no ícone de coração nos cards
Ver detalhes: Clique em qualquer filme para ver informações completas
Navegar páginas: Use os botões "Anterior" e "Próxima" nos resultados

Contribuindo

Faça um fork do projeto
Crie uma branch para sua feature (git checkout -b feature/nova-feature)
Commit suas mudanças (git commit -m 'Adiciona nova feature')
Push para a branch (git push origin feature/nova-feature)
Abra um Pull Request
