screen -S "rcb-be" -X stuff "export DB_URL=$1$(printf \\r)"
screen -S "rcb-be" -X stuff "export DB_USERNAME=$2$(printf \\r)"
screen -S "rcb-be" -X stuff "export DB_PASSWORD=$3$(printf \\r)"
screen -S "rcb-be" -X stuff "java -jar ./recipe-box-backend-0.0.1-SNAPSHOT.jar$(printf \\r)"
