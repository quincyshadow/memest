# syntax=docker/dockerfile:experimental
FROM node:12-alpine

WORKDIR /opt/app

ENV PORT=80
ENV NODE_ENV=production

# <START> docker-compose commands converted due to opeNode dropping support.
RUN -e POSTGRES_PASSWORD=postgres
RUN -e POSTGRES_DB=memest postgres:11-alpine | grep var >> >> /boot.sh
RUN -v .:/opt/app/ --name default --env-file .env --expose 80:80 
RUN -v /opt/app/db/:/var/lib/postgresql/data postgres:11-alpine 
# <END> docker-compose

# daemon for cron jobs
RUN echo 'crond' > /boot.sh
# RUN echo 'crontab .openode.cron' >> /boot.sh

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

RUN npm install --production

# Bundle app source
COPY . .

CMD sh /boot.sh && npm start

RUN echo 'npm run dbreload' >> /boot.sh