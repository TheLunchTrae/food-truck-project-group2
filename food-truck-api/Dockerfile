FROM tomcat:8.0    

RUN mvn clean install -DskipTests

FROM openjdk:16

COPY target/food-truck-api.jar .app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "/app.jar"] 