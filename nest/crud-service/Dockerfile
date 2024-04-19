FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .
RUN npm run build
EXPOSE 7070
CMD ["npm", "run", "start:dev"]