### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/nvd3-graph /usr/share/nginx/html
# COPY nginx/default.conf /etc/nginx/conf.d/
# RUN rm -rf /usr/share/nginx/html/*
# COPY /dist/nvd3-graph /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]