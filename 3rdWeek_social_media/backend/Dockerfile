FROM alpine:latest
RUN apk add --update nodejs npm
WORKDIR /app
COPY . /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 5000
CMD ["npm", "start"]