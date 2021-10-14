FROM node:12 AS build
WORKDIR /build
COPY . .

RUN yarn install
RUN yarn run build

FROM node:12
WORKDIR /app
COPY --from=build /build .
 
RUN chmod +x ../food-truck-frontend/frontend-entrypoint

# Running the app
ENTRYPOINT ../food-truck-frontend/frontend-entrypoint 
