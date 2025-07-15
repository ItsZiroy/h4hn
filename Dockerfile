# Build stage
FROM node:22-alpine AS builder
ARG STRAPI_URL
ARG STRAPI_TOKEN
ENV STRAPI_URL=${STRAPI_URL}
ENV STRAPI_TOKEN=${STRAPI_TOKEN}
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Serve with busybox
FROM busybox:1.37
COPY --from=builder /app/dist /www
CMD ["httpd", "-f", "-p", "3000", "-h", "/www"]
EXPOSE 3000