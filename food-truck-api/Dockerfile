FROM openjdk:16

RUN apt-get install maven

RUN mvn install

COPY target/food-truck-api.jar .app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "/app.jar"] 