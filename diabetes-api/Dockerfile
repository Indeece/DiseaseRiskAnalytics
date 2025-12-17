FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar diabetes-api.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "diabetes-api.jar"]