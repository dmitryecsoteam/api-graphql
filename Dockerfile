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

# Define environment variables
ENV MONGO_HOST=192.168.0.42 MONGO_PORT=27017 MONGO_DB=ECSO-DB MONGO_USER=ecso_user MONGO_PASS=Qwerty12 API_PORT=4000

# Run node
CMD [ "node", "index.js" ]