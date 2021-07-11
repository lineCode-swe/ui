FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY ./dist/ui /usr/share/nginx/html

EXPOSE 8081
