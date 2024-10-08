#!/bin/bash

screen -S "rcb-be" -X stuff "export DB_URL='$1'$(printf \\r)"
screen -S "rcb-be" -X stuff "export DB_USERNAME='$2'$(printf \\r)"
screen -S "rcb-be" -X stuff "export DB_PASSWORD='$3'$(printf \\r)"
screen -S "rcb-be" -X stuff "reset$(printf \\r)"
screen -S "rcb-be" -X stuff "java -jar ~/rcb-be/recipe-box-backend-*.jar --spring.profiles.active=prod --server.port=$4$(printf \\r)"
