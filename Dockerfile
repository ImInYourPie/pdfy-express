ARG PORT

FROM node:16-alpine

WORKDIR /user/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE ${PORT}
