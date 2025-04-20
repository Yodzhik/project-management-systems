
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./

RUN npm install


FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules



COPY index.html ./
COPY vite.config.js ./
COPY public ./public


EXPOSE 5173


CMD ["npm", "run", "dev", "--", "--host"] 