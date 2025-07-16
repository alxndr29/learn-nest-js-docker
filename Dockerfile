# Gunakan arg untuk menentukan mode (default: development)
ARG NODE_ENV=development
FROM node:20

# Simpan NODE_ENV sebagai environment variabel juga
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Install dev tools jika development
RUN if [ "$NODE_ENV" = "development" ]; then \
      npm install -g @nestjs/cli ts-node-dev; \
    fi

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Jalankan sesuai environment
CMD if [ "$NODE_ENV" = "production" ]; then \
      npm run build && node dist/main.js; \
    else \
      npm run start:dev; \
    fi
