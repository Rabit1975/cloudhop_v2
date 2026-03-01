# Build stage
FROM node:20.18-alpine3.21 AS builder

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json to working directory
COPY package*.json ./

# Install dependencies (excluding devDependencies to save space)
RUN npm ci --frozen-lockfile --only=production && \
    npm install --only=dev && \
    npm run build && \
    rm -rf node_modules && \
    npm ci --frozen-lockfile --only=production

# Copy the rest of the application code to container
COPY . .

# Build the application
RUN npm run build

# Production stage - use smaller base image
FROM nginx:alpine

# Install gzip for better compression
RUN apk add --no-cache gzip

# Copy built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (nginx default)
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Define command to run nginx
CMD ["nginx", "-g", "daemon off;"]
