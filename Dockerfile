# base image
FROM node:12.13.1-alpine

# set working directory
RUN mkdir /gamedooraFrontend
WORKDIR /gamedooraFrontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /gamedooraFrontend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /gamedooraFrontend/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY . .

# start app
CMD ["yarn", "start"]
