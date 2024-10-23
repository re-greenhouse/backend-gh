# Use the Alpine base image
FROM alpine:latest

# Install required packages
RUN apk update && \
    apk add --no-cache git nodejs npm

# Initialize Git repository
RUN git init

# Clone the application repository
RUN git clone https://github.com/re-greenhouse/backend-gh.git

# Set working directory
WORKDIR /backend-gh

# Checkout the desired branch
RUN git checkout feature/deploy

# Install npm dependencies
RUN npm install

# Copy the environment file
RUN cp .env.example .env

# Install PM2 globally
RUN npm install pm2 -g

# Build the application
RUN npm run build api-gateway && \
    npm run build iam && \
    npm run build personas && \
    npm run build crops

# Start the PM2 processes using the configuration file
CMD ["pm2-runtime", "start", "pm2.config.js"]
