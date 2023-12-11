FROM maven:3.8.5-openjdk-17 AS MAVEN_BUILD
COPY pom.xml /build/
COPY mvnw /build/
COPY .mvn /build/.mvn
COPY  src /build/src/
WORKDIR /build/
RUN mvn clean package -DskipTests -e

FROM openjdk:17-oracle
WORKDIR /app
COPY --from=MAVEN_BUILD /build/target/shortly-api-0.0.1-SNAPSHOT.jar /app/shortly-api.jar
EXPOSE 9002
ENTRYPOINT ["java", "-jar", "/app/shortly-api.jar"]