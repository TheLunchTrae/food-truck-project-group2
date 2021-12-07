FROM openjdk:16

COPY app.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=$PORT"] 