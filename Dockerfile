FROM node:15
COPY . /app
WORKDIR /app
RUN npm i
CMD npm run start
