1) Test Application using docker container:

//build image
docker build -t usermanagement-ui-i:1.0 .

//listing only usermanagement-ui-i images 
docker images usermanagement-ui-i

//run container with name
docker run --name usermanagement-ui-c -d -p 8081:80 usermanagement-ui-i:1.0

//shut down container
Press Ctrl+C to shut down

//stop running container
docker stop usermanagement-ui-c

//start existing container
docker start usermanagement-ui-c

//enter into the container
docker exec -it usermanagement-ui-c sh

//check api service computer ip ping or not
#ping <api service ip>

//Issue: if ping not found install following command and test again
#apt-get update
#apt-get install iputils-ping
#ping <api service ip>

//exit from container
#exit

//remove container
docker rm usermanagement-ui-c

//remove image
docker rmi usermanagement-ui-i:1.0

//see container logs
docker logs usermanagement-ui-c

// copy folder and files into docker container
docker cp ./src/ usermanagement-ui-c:/usr/share/nginx/html/

// copy fonts folder into docker container - when fonts not loaded and give not found error. 
docker cp ./src/assets/fonts/ usermanagement-ui-c:/usr/share/nginx/html/src/assets/

// create folder inside container and move files and folders
docker exec -it usermanagement-ui-c sh
# ls
# mkdir -p /usr/share/nginx/html/src/
# exit

docker cp ./src/assets usermanagement-ui-c:/usr/share/nginx/html/src/
docker cp ./src/assets/fonts/ usermanagement-ui-c:/usr/share/nginx/html/src/assets/

// copy dist folder inside empty container
docker cp dist/UserManagementUI/ usermanagement-ui-c:/usr/share/nginx/html

// Note: Docker Toolbox default IP:
192.168.99.100

2) Test Application using docker compose:

// create and start the containers
docker-compose up

// After the first time, however, we can simply use start to start the services
docker-compose start

// In case our file has a different name than the default one (docker-compose.yml), we can exploit the -f and ––file flags to specify an alternate file name
docker-compose -f custom-compose-file.yml start

// Compose can also run in the background as a daemon when launched with the -d option
docker-compose up -d

// To safely stop the active services, we can use stop, which will preserve containers, volumes, and networks, along with every modification made to them
docker-compose stop

// To reset the status of our project, instead, we simply run down, which will destroy everything with only the exception of external volumes
docker-compose down


3) Empty container image(Only oprating system that is base image) and later copy dist folder.

# base image
FROM nginx:1.16.0-alpine

# copy local dist folder inside container(This will aplicable when we have empty container with base image.)
COPY dist/UserManagementUI /usr/share/nginx/html

# copy local assets folder inside container
COPY ./src/assets/ /usr/share/nginx/html/src/assets/

# copy local font folder inside container
#COPY ./src/assets/fonts/ /usr/share/nginx/html/src/assets/

# listing folders and files within container 
#RUN ls -laR /usr/share/nginx/html/src/assets/*

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
