# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the default Vite port
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
