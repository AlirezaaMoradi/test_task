# Build
FROM node:24.9 AS Builder

WORKDIR /app

COPY package*.json ./

RUN npm ci  --omit=dev

COPY . ./

EXPOSE 8000

RUN npm run build

# Run
FROM node:24.9 AS Runner

WORKDIR /app

COPY --from=Builder /app/node_modules ./node_modules
COPY --from=Builder /app/package*.json ./package.json
COPY --from=Builder /app/dist ./dist

CMD ["node", "dist/main.js"]