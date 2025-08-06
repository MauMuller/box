FROM nginx:1.29.0-alpine AS web-server-development

FROM nginx:1.29.0-alpine AS web-server-prodution
COPY nginx.conf /etc/nginx/nginx.conf