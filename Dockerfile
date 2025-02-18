FROM node:20-alpine

WORKDIR /app

# Install specific version of pnpm
RUN npm install -g pnpm@8.15.4

# Copy package files
COPY package.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies with force flag
RUN pnpm install --force

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]

