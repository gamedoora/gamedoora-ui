FROM node:22-alpine as builder
WORKDIR /app

# Copy and install dependencies
COPY . .
RUN npm ci

RUN cp .env.example .env
RUN npm run build

# Stage 2: Production Stage
FROM node:22-alpine
WORKDIR /app

# Copy production build and dependencies from the builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./

# Expose the application port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]