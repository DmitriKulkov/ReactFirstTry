FROM node:latest
WORKDIR /client/
COPY package*.json /client/
RUN npm install
COPY react-first-try /client/
#EXPOSE 3000
#CMD ["npm", "run", "start"]
