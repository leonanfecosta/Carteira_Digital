FROM node:16.18

WORKDIR /app/backend
 
COPY package* ./

RUN npm config set cache /tmp --global

RUN npm install

RUN npm run build

COPY . ./

CMD [ "npm", "run", "start" ] 