FROM node:20

# Install dependencies global (nodemon, ts-node)
RUN npm install -g @nestjs/cli ts-node-dev

# Set working directory
WORKDIR /app

# Copy file package.json & install dependencies
COPY package*.json ./
RUN npm install

# Copy semua source code
COPY . .

# Expose port NestJS
EXPOSE 3000

# Jalankan NestJS dev dengan hot-reload
CMD ["npm", "run", "start:dev"]
