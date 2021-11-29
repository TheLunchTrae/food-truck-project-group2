FROM maven:3.5.4-jdk-16-alpine

RUN mvn clean install -DskipTests

FROM openjdk:16

COPY target/food-truck-api.jar .app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "/app.jar"] 