# Build stage
FROM node:22-alpine AS builder
ARG STRAPI_URL
ENV STRAPI_URL=${STRAPI_URL}
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Serve with busybox
FROM busybox:1.37
COPY --from=builder /app/dist /www
CMD ["httpd", "-f", "-p", "80", "-h", "/www"]
EXPOSE 80