FROM node
COPY ./src /usr/src
WORKDIR /usr/src
RUN npm install
EXPOSE 8080
CMD sh -c "sleep 10 && npm run start:seed"