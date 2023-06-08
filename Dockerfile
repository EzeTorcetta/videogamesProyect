#Use a Node.js base image
FROM node:14


#Copy the rest of the application code to the working directory
COPY ./api ./api
COPY ./client ./client

WORKDIR "/api"

#Install dependencies
RUN npm install



#Expose the port that the application will run on
EXPOSE 3000

#Start the application
CMD npm start

WORKDIR "/client"

#Install dependencies
RUN npm install

#Start the application
CMD npm start
