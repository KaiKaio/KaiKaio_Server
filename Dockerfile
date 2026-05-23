FROM node:22-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev && npm i -g pm2
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/views ./views
COPY --from=builder /usr/src/app/.env.production ./.env.production
COPY ecosystem.config.js ./
RUN mkdir -p util/ssl_key
EXPOSE 4000
HEALTHCHECK CMD node -e "var http=require('http');var req=http.request({host:'localhost',port:4000,path:'/'},function(r){if(r.statusCode!==200)process.exit(1)});req.on('error',function(){process.exit(1)});req.end()"
CMD ["pm2-runtime", "ecosystem.config.js"]

# docker build -t kaikaio-server:latest .
# docker run -d --name kaikaio-server -e MONGO_URI="host.docker.internal:27017/KaiKaiBlog" -p 4000:4000 kaikaio-server:latest
