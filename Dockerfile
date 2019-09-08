FROM node:12-slim
RUN apt-get -y update && apt-get -y upgrade
WORKDIR /usr/app
COPY package.json ./
RUN npm --quiet install
COPY rollup.config.js ./
COPY src src
COPY public public

ENTRYPOINT ["npm"]
CMD ["run", "dev"]
