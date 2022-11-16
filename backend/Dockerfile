FROM node:16.18

WORKDIR /app/backend
 
COPY package* ./

RUN npm config set cache /tmp --global

RUN npm install

COPY . ./

CMD [ "npm", "run", "dev" ] 