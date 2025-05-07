#backend/dockerfile

FROM node:23-alpine 

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

# Set environment variable for Prisma at build time
ENV DATABASE_URL="postgresql://postgres:password@pg-db:5432/mydb?schema=public"

COPY . .

RUN npx prisma generate

RUN npm  run build

EXPOSE 8080

# CMD ["npm", "run", "start"]
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]