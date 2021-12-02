FROM maven:3.8.4

WORKDIR /food-truck-backend

COPY /src .

COPY pom.xml .

RUN mvn clean install -DskipTests

FROM openjdk:16

COPY /target/food-truck-api.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "app.jar"] 
