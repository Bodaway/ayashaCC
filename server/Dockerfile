FROM node:12.18-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
#RUN npm install --production --silent && mv node_modules ../
RUN yarn install
COPY . .
EXPOSE 7000
CMD npm start