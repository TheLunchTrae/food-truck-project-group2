FROM node:12

WORKDIR /food-truck-frontend

COPY . .

RUN yarn install

RUN yarn run build

EXPOSE 3000

RUN chmod +x ./frontend-entrypoint

ENTRYPOINT ./frontend-entrypoint