FROM openjdk:16

COPY app.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java",  "-jar", "-Dspring.profiles.active=production", "app.jar"] 