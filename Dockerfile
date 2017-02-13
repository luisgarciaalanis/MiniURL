FROM node:6.9.5

MAINTAINER Luis Garcia Alanis

ENV NODE_ENV=production
ENV PORT=3000

COPY . /var/www
WORKDIR /var/www

VOLUME [ "/var/log/miniurl"]

RUN npm install

EXPOSE $PORT

ENTRYPOINT [ "npm", "start" ]
