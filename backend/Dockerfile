# # Use official Node.js image
# FROM node:18

# # Set working directory
# WORKDIR /app

# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy the rest of the backend code
# COPY . .

# # Expose the port your backend runs on
# EXPOSE 8002

# # Start the backend server
# CMD ["node", "server.js"]


# 1. Use the official Node image
FROM node:20-alpine

WORKDIR /app

# 2. Copy dependency definitions
COPY package*.json ./

# 3. Mirror Render's install step
RUN npm ci

# 4. Copy code & replicate Render's Build Command
COPY . .
RUN npm run build

# 5. Expose default port
EXPOSE 3000

# 6. Mirror Render's Start Command
CMD ["node", "dist/server.js"]