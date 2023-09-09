#Use node js v14 as the base image 
FROM node:14

# set working directory in the container
WORKDIR /usr/src/app

# copy package.json and package-lock.json to the working directory
COPY package*.json ./

# install dependencies
RUN npm install

# copy all the files from the current directory to the working directory
COPY . .

# expose port 3001
EXPOSE 3001

# start the application
CMD ["node", "index.js"]