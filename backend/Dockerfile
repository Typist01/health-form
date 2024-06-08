# Use the official Node.js image
FROM node:16

# Create and set the working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8080

# Define the command to run the application
CMD ["npm", "run", "start"]
