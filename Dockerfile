# Build stage
FROM node:22-alpine AS builder
ARG STRAPI_URL
ARG SITE_URL
ARG STRAPI_TOKEN
ARG DRAFT_MODE
ENV STRAPI_URL=${STRAPI_URL}
ENV SITE_URL=${SITE_URL}
ENV STRAPI_TOKEN=${STRAPI_TOKEN}
ENV DRAFT_MODE=${DRAFT_MODE}
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Serve with NGINX
FROM nginx:1.29-alpine-slim

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
