FROM node:16-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production && npm i -g pm2
COPY . .
RUN mkdir -p util/ssl_key
EXPOSE 4000
HEALTHCHECK CMD node -e "var http=require('http');var req=http.request({host:'localhost',port:4000,path:'/'},function(r){if(r.statusCode!==200)process.exit(1)});req.on('error',function(){process.exit(1)});req.end()"
CMD ["pm2-runtime", "ecosystem.config.js"]

# docker build -t kaikaio-server:latest .
# docker run -e MONGO_URI="host.docker.internal:27017/KaiKaiBlog" -p 4000:4000 kaikaio-server:latest
