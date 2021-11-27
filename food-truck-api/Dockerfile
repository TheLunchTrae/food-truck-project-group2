FROM maven:3.8.3-openjdk-16

WORKDIR /workspace

COPY pom.xml ./

COPY src ./

RUN mvn install -DskipTests

FROM openjdk:16

COPY ./target/food-truck-api.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "/app.jar"]