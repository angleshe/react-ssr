FROM node:10.0
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY package.json /usr/src/app/
RUN cd /usr/src/app/
RUN npm install --production
COPY ./build /usr/src/app/
EXPOSE 7001
CMD ["npm", "run", "start"]
