#frontend/Dockerfile

FROM node:23-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY . .

RUN npm run build 

RUN npm install -g serve

EXPOSE 3000


CMD ["serve", "-s", "dist", "-l", "3000"]