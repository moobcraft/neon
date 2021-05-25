FROM node:15
ADD . /app
WORKDIR /app
RUN npm i
CMD npm run start
