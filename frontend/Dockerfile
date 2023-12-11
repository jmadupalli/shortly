FROM node:lts-alpine as react_builder
WORKDIR /app
COPY . .
RUN rm -rf node_modules && npm i
RUN npm run build

FROM nginx:alpine
COPY --chown=nginx:nginx nginx-ui.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=react_builder /app/dist/ /var/www/html/
