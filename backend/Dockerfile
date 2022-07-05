FROM node:14.18

WORKDIR /var/www/html

COPY ./nest-cli.json /var/www/html/nest-cli.json

COPY ./package.json /var/www/html/package.json

COPY ./tsconfig.build.json /var/www/html/tsconfig.build.json

COPY ./tsconfig.json /var/www/html/tsconfig.json

COPY ./yarn.lock /var/www/html/yarn.lock

EXPOSE 3000

RUN apt-get update && \
	apt-get install git --yes && \
	yarn install
