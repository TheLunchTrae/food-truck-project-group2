FROM node:12

WORKDIR /food-truck-frontend

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
