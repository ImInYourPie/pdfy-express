ARG PORT


FROM node:16-alpine

RUN echo ${PORT}


WORKDIR /user/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE ${PORT}
