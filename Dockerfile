FROM node:14-alpine AS development
ENV NODE_ENV development

ARG PORT
RUN echo $PORT

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

EXPOSE $PORT

CMD [ "npm", "run", "start" ]