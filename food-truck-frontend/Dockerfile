FROM node:12

WORKDIR /food-truck-frontend

COPY . .

RUN yarn install

RUN yarn run build

RUN chmod +x ./frontend-entrypoint

ENTRYPOINT ./frontend-entrypoint