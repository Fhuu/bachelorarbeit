FROM node:14.18

WORKDIR /var/www/html

COPY ./ /var/www/html/

RUN yarn install

EXPOSE 3000

CMD [ "yarn" , "start"]