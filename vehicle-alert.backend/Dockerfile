# Dockerfile for quiz.backend (NestJS)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 4000
CMD npm run seed && npm run start:dev
