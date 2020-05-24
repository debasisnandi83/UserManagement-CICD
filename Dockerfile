#############
### build ###
#############

# base image
#FROM node:12.2.0 as build

# set working directory
#WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
#COPY package.json /app/package.json
#RUN npm install

# add app
#COPY . /app

# generate build
#RUN ng build --output-path=dist

############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
#COPY --from=build /app/dist /usr/share/nginx/html

# copy local dist folder inside container(This will aplicable when we have empty container with base image.)
COPY dist/UserManagementUI /usr/share/nginx/html

# copy local assets folder inside container
COPY ./src/assets /usr/share/nginx/html/src/assets

# create folder within container
#RUN mkdir -p /usr/share/nginx/html/src/assets/fonts/

# copy local font folder inside container
#COPY ./src/assets/fonts/ /usr/share/nginx/html/src/assets/

# listing folders and files within container 
#RUN ls -laR /usr/share/nginx/html/src/assets/*
#RUN ls -laR /usr/share/nginx/html/*

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]