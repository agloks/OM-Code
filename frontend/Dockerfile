# frontend/Dockerfile

FROM node:lts-bookworm

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do aplicativo
COPY . .

# Exponha a porta na qual o app vai rodar
EXPOSE 3000

# Comando para rodar o aplicativo
CMD ["npm", "run", "dev"]
