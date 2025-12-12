FROM node:20-bullseye-slim 

WORKDIR /auth_app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]