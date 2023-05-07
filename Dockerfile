FROM node:16.3.0-alpine

# Working Dir
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Copy Package Json Files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy Source Files
COPY . .

# Build the Code
RUN npm run build

# Expose the API Port
EXPOSE 8080

CMD ["node", "dist/main"]