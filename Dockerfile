ARG NODE_VERSION=23.5.0

# Create build stage
FROM node:${NODE_VERSION}-slim AS build

# Enable and prepare pnpm with a known good version
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack prepare pnpm@8.6.0 --activate

# Set the working directory inside the container
WORKDIR /app

COPY . ./

## Install dependencies
RUN pnpm install

# Build the application
RUN pnpm build

# Create a new stage for the production image
FROM node:${NODE_VERSION}-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the output from the build stage to the working directory
COPY --from=build /app/.output ./

# Expose the port the application will run on
EXPOSE 3000

# Start the application
CMD ["node","/app/server/index.mjs"]
