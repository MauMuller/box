FROM postgres:17.5-alpine3.21 AS database

FROM nginx:1.29.0-alpine AS web-server-development

FROM nginx:1.29.0-alpine AS web-server-prodution
COPY nginx.conf /etc/nginx/nginx.conf