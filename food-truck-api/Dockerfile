FROM maven:3.8.4

WORKDIR /food-truck-backend

ARG SPRING_DATASOURCE_URL=jdbc:postgresql://ec2-3-94-232-234.compute-1.amazonaws.com:5432/d6iaa0fiadhjh5?sslmode=require

ARG spring_DATASOURCE_USERNAME=jufyymcngegdrc

ARG SPRING_DATASOURCE_PASSWORD=17e0ddc1c58e1d77292b472f99ad39eb54a13fab568c237c13f9f380a5ae7161

ARG SPRING_JPA_HIBERNATE_DDL-AUTO=update

COPY /src .

COPY pom.xml .

RUN mvn clean package -DskipTests

FROM openjdk:16


COPY target/food-truck-api.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "app.jar"] 