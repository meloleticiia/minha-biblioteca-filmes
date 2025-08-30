Minha Biblioteca de Filmes

Aplicação em React para buscar e salvar filmes favoritos usando a API do The Movie Database (TMDB).

Tecnologias

React

Axios

Lucide React (ícones)

The Movie Database API

Como rodar o projeto

Clone este repositório:

git clone https://github.com/seu-usuario/minha-biblioteca-filmes.git


Entre na pasta do projeto:

cd minha-biblioteca-filmes


Instale as dependências:

npm install


Crie um arquivo .env na raiz do projeto com base no .env.example:

REACT_APP_API_KEY=sua_api_key_aqui
REACT_APP_API_URL=https://api.themoviedb.org/3
REACT_APP_IMG_BASE=https://image.tmdb.org/t/p/w200


Rode o projeto:

npm start


Acesse em:

http://localhost:3000

Funcionalidades

Buscar filmes por nome

Ver detalhes do filme

Favoritar e desfavoritar filmes (armazenados no localStorage)

Listar filmes em alta