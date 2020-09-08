FROM node:lts

ENV YARN_VERSION 1.13.0

ENV TERM xterm

RUN apt-get update && apt-get install -f -y postgresql-client

WORKDIR /app

COPY . .

RUN yarn install 

COPY ./infra/entrypoint.sh ./

RUN chmod +x ./entrypoint.sh
CMD ["/bin/bash", "./entrypoint.sh", "db:5432", "--", "yarn", "start"]

