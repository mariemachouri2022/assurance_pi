FROM openjdk:21
EXPOSE 8023
ADD target/User-0.0.1-SNAPSHOT.jar users.jar
ENTRYPOINT ["java", "-jar", "users.jar"]
