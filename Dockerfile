# Stage 1: Build Next.js static export
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Accept build-time env vars
ARG NEXT_PUBLIC_ADMIN_KEY
ENV NEXT_PUBLIC_ADMIN_KEY=$NEXT_PUBLIC_ADMIN_KEY

# Build and export static files to ./out
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
