FROM openjdk:21-jdk
ADD target/*.jar backend.jar
# the same port as in application.properties (server port)
EXPOSE 8080
# starts the app using this command: java -jar backend.jar
ENTRYPOINT ["java", "-jar", "backend.jar"]

#Steps to build an image:
#mvn clean install -> creates the new jar in target folder
#sudo docker build -f Dockerfile -t postgres_backend -> builds the image based on this Dockerfile

#sudo docker inspect 16187187ad2d | grep IPAddress -> returns the IP address (172.17.0.2)

#Running the container:
#sudo docker run -e DB_URL=jdbc:postgresql://localhost:5435/backend?characterEncoding=UTF-8 -e DB_USERNAME=postgres -e DB_PASSWORD=postgres -p 8081:8080 backend
