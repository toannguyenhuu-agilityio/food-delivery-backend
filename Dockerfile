ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine AS base


# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files to the container (use package.json and package-lock.json)
COPY package*.json ./

# Install dependencies (for all environments)
RUN npm install --production=false

# Install nodemon globally
RUN npm install -g nodemon 

EXPOSE 3000

# Create a development environment
FROM base AS dev
# Install development dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
USER node
COPY . .
CMD npm run dev

# Create a production environment
FROM base AS prod
# Install production dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
RUN npm install husky --save-dev 
USER node
COPY . .
CMD node src/index.ts

FROM base AS test
# Install test dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
USER node
COPY . .
CMD npm run test