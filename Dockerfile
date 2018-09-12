FROM node:8.11-alpine

# Listen port 4000
EXPOSE 4000

# Create directory 
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy sources
COPY src /app

# Run node
CMD [ "node", "index.js" ]