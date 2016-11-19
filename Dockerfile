FROM node:latest
MAINTAINER Adventurous V-Necks

RUN mkdir -p /opt/app

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /opt/app

WORKDIR /opt/app/
ADD package.json /opt/app/
RUN mkdir /opt/app/server
RUN mkdir /opt/app/models
COPY * /opt/app/
COPY server/ /opt/app/server/
COPY models/ /opt/app/models/
RUN mkdir /opt/app/dist
COPY dist/* /opt/app/dist/
RUN mkdir /opt/app/public
COPY public/ /opt/app/public/
EXPOSE 3000
ENV NODE_ENV production
ENV PORT 3000
CMD ["npm", "run", "build"]
CMD ["npm", "start"]
