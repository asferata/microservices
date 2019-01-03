FROM node:10.1.0-alpine

RUN adduser -D -u 1001 docker

RUN apk update \
    && apk add git

RUN apk add --no-cache --virtual .health-check curl \
 && apk add --no-cache --virtual .build-deps git build-base g++ \
 && apk add --no-cache --virtual .npm-deps cairo-dev libjpeg-turbo-dev pango

CMD sudo ntpdate ntp.org

# Create app directory
RUN mkdir /app
WORKDIR /app/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app/

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /app


EXPOSE 8030

CMD [ "npm", "start" ]