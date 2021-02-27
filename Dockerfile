FROM node:12-stretch

ENV APP=/home/app/pkmmlz

WORKDIR $APP

COPY scripts/wait-for-it.sh /usr/bin/wait-for-it

RUN chmod +x /usr/bin/wait-for-it

COPY . $APP

RUN npm i

RUN npm run build
