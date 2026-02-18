# Build stage
FROM node:20-alpine as builder

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json to working directory
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm install

# Copy the rest of the application code to container
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine as production

# Copy built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (nginx default)
EXPOSE 80

# Define command to run nginx
CMD ["nginx", "-g", "daemon off;"]
