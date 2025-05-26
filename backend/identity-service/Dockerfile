# use the officil node.js image wirh alpine linux as the base image
FROM node:18-alpine

# set the working directory
WORKDIR /use/src/app    

# copy the package.json and package-lock.json files to the working directory
COPY package*.json .

# install dependencies
RUN npm ci --only=production

# copy the rest of the application code to the working directory
COPY . .

# expose the port that the application runs on
EXPOSE 3001

# run the application
CMD ["node", "server.js"]