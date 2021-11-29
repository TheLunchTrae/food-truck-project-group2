FROM ubuntu:latest

RUN apt install maven

FROM openjdk:16

RUN mvn install

COPY target/food-truck-api.jar .app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "/app.jar"] 