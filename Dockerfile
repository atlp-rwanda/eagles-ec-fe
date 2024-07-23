# Use a specific version of Node Alpine as the base image.
ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine as base

# Update npm to the latest version
RUN npm install -g npm@latest

# Set the working directory inside the container.
WORKDIR /eagles-ec-fe

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Command to run the app
CMD [ "npm", "run", "dev" ]
