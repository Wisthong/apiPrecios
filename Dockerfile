FROM node:20.12.2 as runner

WORKDIR /app
COPY . .

RUN npm install --force
EXPOSE 3000

CMD [ "npm","run","start" ]

