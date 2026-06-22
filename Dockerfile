# base image
FROM node:20.11.1-alpine

# set working directory
WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install --legacy-peer-deps

# copy all project
COPY . .

# build Next.js app
RUN npm run build

# expose port
EXPOSE 3000

# run next start
CMD ["npm", "run", "start"]
