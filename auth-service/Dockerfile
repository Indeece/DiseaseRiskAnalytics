FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar auth-service.jar
EXPOSE 8090
ENTRYPOINT ["java", "-jar", "auth-service.jar"]