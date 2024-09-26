FROM maven:3.9-eclipse-temurin-21-alpine as build

# Create app folder and move local files
COPY ./pom.xml /recipe-box/
COPY src /recipe-box/recipe-box-backend/src
COPY pom.xml /recipe-box/recipe-box-backend/pom.xml

WORKDIR /recipe-box/recipe-box-backend

# Install project dependencies and build production bundle
RUN mvn package -B -e

FROM maven:3.9-eclipse-temurin-21-alpine as deploy

COPY --from=build /recipe-box/recipe-box-backend/target/recipe-box-backend*.jar /deploy/rcb-be.jar
# Port to be exposed when deploying the container + env variable to use on build
EXPOSE 8080
ENV DB_URL=jdbc:mysql://localhost:3306/db
ENV DB_USERNAME=admin
ENV DB_PASSWORD=admin

CMD [ "java", "-jar", "/deploy/rcb-be.jar", "--spring.profiles.active=prod"]
