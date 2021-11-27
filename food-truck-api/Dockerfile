FROM maven:3.8.3-openjdk-16

WORKDIR /workspace

COPY pom.xml ./

COPY src ./

RUN mvn install -DskipTests

FROM openjdk:16

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "/app.jar"]