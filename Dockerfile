FROM postgres:17.5-alpine3.21 AS database

FROM nginx:1.29.0-alpine AS web-server-development

FROM nginx:1.29.0-alpine AS web-server-prodution
COPY nginx.conf /etc/nginx/nginx.conf

FROM node:24.4.1-alpine AS app-development
WORKDIR /app
ENTRYPOINT npm run dev

FROM node:24.4.1-alpine AS app-prodution
WORKDIR /app
COPY . .
RUN npm ci && npm run build
ENTRYPOINT npm run start