# Use the Alpine base image
FROM alpine:latest

# Install required packages
RUN apk update && \
    apk add --no-cache git nodejs npm docker docker-compose

# Copy the application files
RUN git clone https://github.com/re-greenhouse/backend-gh.git

RUN git checkout feature/deploy

# Set working directory
WORKDIR /backend-gh

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

# Expose the ports
EXPOSE 3000

# Copy the PM2 configuration file
COPY pm2.config.js .

# Start the PM2 processes using the configuration file
CMD ["pm2-runtime", "start", "pm2.config.js"]
