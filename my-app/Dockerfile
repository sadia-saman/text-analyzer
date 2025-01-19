FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY src/ .

RUN npm install jest --global

EXPOSE 3000
CMD [ "node", "app.js" ]
