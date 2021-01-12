FROM node:14.1-alpine
WORKDIR /opt/web
COPY /app/package.json /app/package-lock.json ./
RUN npm install
ENV PATH="./node_modules/.bin:$PATH"
WORKDIR /opt/web/app
COPY /app ./
EXPOSE 8080
CMD ["npm", "start"]