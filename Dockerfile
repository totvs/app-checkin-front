ARG NODE_VERSION=10
FROM node:${NODE_VERSION}

ADD ["package.json", "package-lock.json" , "/sources/"]
WORKDIR /sources
RUN npm ci

ADD ./ /sources

RUN npm rebuild node-sass
RUN npm run build

FROM docker.totvs.io/thf/proxy
ADD entry.sh /entry.sh
COPY --from=0 /sources/www /sources
ENTRYPOINT ["/entry.sh"]
CMD ["nginx", "-g", "daemon off;"]
