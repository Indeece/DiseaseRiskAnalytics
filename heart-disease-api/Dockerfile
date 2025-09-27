FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar heart-disease-api.jar
EXPOSE 8084
ENTRYPOINT ["java", "-jar", "heart-disease-api.jar"]