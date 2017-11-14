FROM keyax/ubuntu_core

LABEL maintainer="yones.lebady AT gmail.com" \
      keyax.os="ubuntu core" \
      keyax.os.ver="16.04.3 xenial" \
      keyax.vendor="Keyax" \
      keyax.app="Nodejs 8.5.0" \
      keyax.app.ver="2.7"

# RUN groupadd -r nodejs && useradd -r -g nodejs nodejs --create-home nodejs
RUN groupadd --gid 11000 node \
  && useradd --uid 11000 --gid node --shell /bin/bash --create-home node

# gpg keys listed at https://github.com/nodejs/node
RUN ["/bin/bash", "-c",  "set -ex; \
  gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 94AE36675C464D64BAFA68DD7434390BDBE9B9C5; \
  gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys DD8F2338BAE7501E3DD5AC78C273792F7D83545D; \
gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8; \
gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 56730D5401028683275BD23C23EFEFE93C4CFFFE; \
gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys FD3A5288F042B6850C66B31F09FE44734EB7990E; \
gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys B9AE9905FFD7803F25714661B63B535A4C206CA9; \
gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 71DCFD284A79C3B38668286BC97EC7A07EDE3FC1"]

#RUN ["/bin/bash", "-c",  "set -ex; \
#    for key in \
#   94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
#   B9AE9905FFD7803F25714661B63B535A4C206CA9 \ ha.pool unreach
#   71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \ unreachable
###  0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
#   C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
#   DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
###  9554F04D7259F04124DE6B476D5A82AC7E37093B \
#   FD3A5288F042B6850C66B31F09FE44734EB7990E \ hkp://p80 unreachable
#   56730D5401028683275BD23C23EFEFE93C4CFFFE \ hkp://ha.pool   unreach
#  ; do gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys $key ; done"]
#  ; do gpg --keyserver pool.sks-keyservers.net --recv-keys $key ; done"]
#  ; do gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys $key ; done"]
#  ; do gpg --keyserver ha.pool.sks-keyservers.net --recv-keys $key ; done"]
#    apt-key adv --recv-key --keyserver pool.sks-keyservers.net $key || \
#    apt-key adv --recv-key --keyserver pgp.mit.edu $key || \
#    apt-key adv --recv-key --keyserver keyserver.pgp.com $key

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 8.9.1
# LTS
# ENV NODE_VERSION 6.11.3

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

## RUN su node \
## && cd /home/node \
## && npm init --yes \
# for building Couchbase Nodejs driver from source : make gcc ...
## && apt-get update && apt-get install --assume-yes --no-install-recommends build-essential \
## && npm install -g couchbase \
#   npm install --save couchbase-promises && \
#   npm install --save ottoman && \
#   npm install --save couchbase --no-bin-links && \
#   npm install "git+https://github.com/couchbase/couchnode.git#master" && \
#   npm install prebuild &&  \
## && apt-get remove build-essential --assume-yes \
#   remove dependencies
#    apt-get autoremove build-essential --assume-yes && \
#   remove dependent packages
#    apt-get purge build-essential && \
# remove packages installed by other packages and no longer needed purge configs
## && apt-get autoremove --purge --assume-yes \
#   remove the aptitude cache in /var/cache/apt/archives frees 0MB
## && apt-get clean \
# delete 27MB all the apt list files since they're big and get stale quickly
## && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
# this forces "apt-get update" in dependent images, which is also good

RUN su node
COPY package.json /home/node/
RUN cd /home/node \
 && npm init --yes \
&& npm install -g nodemon \
&& npm install -g --no-optional pm2 \
# && npm install -g strongloop \
# && npm install -g phonegap@latest \
 && npm install --save builtin-modules \
## && npm install --save http \
## && npm install --save https \
## && npm install --save assert \
## && npm install --save fs \
&& npm install --save fs-extra \
&& npm install --save mz \
# && npm install --save jquery \
# && npm install --save express \
# && npm install --save formidable \
# && npm install --save multer \
# && npm install --save express-session \
# && npm install --save passport \
# && npm install --save express-jwt \
 && npm install --save bluebird \
 && npm install --save co \
 && npm install --save node-fetch \
 && npm install --save axios \
 && npm install --save xhr2 \
# && npm install --save koa2-cors \
&& npm install --save koa \
&& npm install --save koa-send \
&& npm install --save koa-respond \
&& npm install --save koa-static \
&& npm install --save koa-mount \
&& npm install --save koa-route \
&& npm install --save koa-trie-router \
&& npm install --save koa-router \
&& npm install --save koa-combine-routers \
&& npm install --save koa-rest-router \
&& npm install --save koa-ejs \
&& npm install --save koa-bodyparser \
&& npm install --save koa-body \
&& npm install --save koa-validate \
# && npm install --save koa-validation \
# && npm install --save koa-better-body \ ERR! code ENOGIT  needs git ??
&& npm install --save koa-busboy \
&& npm install --save progress-stream \
&& npm install --save koa-json-body \
&& npm install --save json-parse-async \
&& npm install --save json-schema-ref-parser \
&& npm install --save jsonlint \
&& npm install --save koa-cookie \
&& npm install --save cookies \
# && npm install --save cookie-parser \
# && npm install --save body-parser \
&& npm install --save async-busboy \
&& npm install --save querystring \
&& npm install --save qs \
&& npm install --save koa-jwt \
&& npm install --save jsonwebtoken \
&& npm install --save jwt-simple \
# && npm install --save x509 \ ERR! x509@0.3.2 install: `node-gyp rebuild`
&& npm install --save koa-formidable \
&& npm install --save koa-multer \
&& npm install --save koa-logger \
&& npm install --save koa-connect-flash \
 && npm install --save koa-flash \
 && npm install --save koa-session \
# && npm install --save koa-session2 \
 && npm install --save koa-basic-auth \
&& npm install --save koa-session-store \
# && npm install --save koa2-session-store \
 && npm install --save koa-session-mongo \
&& npm install --save koa-session-mongoose \
&& npm install --save mongodb \
&& npm install --save mongoose \
# && npm install --save mongoose@4.10.8 \
&& npm install --save koa-if \
&& npm install --save koa-compose \
&& npm install --save koa-convert \
&& npm install --save koa-csrf \
&& npm install --save koa-passport \
&& npm install --save passport-local \
&& npm install --save passport-local-mongoose \
&& npm install --save bcrypt-nodejs \
&& npm install --save passport-client-certificate \
&& npm install --save passport-jwt \
 && npm install --save passport-facebook \
 && npm install --save passport-twitter \
 && npm install --save passport-google-auth \
 && npm install --save ws \
&& npm install --save socket.io \
&& npm install --save socketio-auth \
&& npm install --save koa-socket-2 \
 && npm install --save koa-socket-passport \
 && npm install --save koa-socket.io \
  && npm install --save koa-socket-session \
# && npm install --save koa.io \
&& npm install --save socket.io-mongodb \
 && npm install --save mubsub \
 && npm install --save exiftool \
&& npm install --save d3 \
&& npm install --save leaflet \
&& npm install --save mysql \
 && npm install --save mysql2 \

&& npm init --yes

WORKDIR /home/node

### RUN mkdir /home/node/js && mkdir /home/node/statics
# empty directory not allowed in ADD throws error:  no such file or directory
# ADD 1 layer,untar,url~; COPY 3 layers
# ADD www/js /home/node/js
# ADD www/img /home/node/img
# ADD www/css /home/node/css
# ADD www/fonts /home/node/fonts
# ADD www/data /home/node/data
# ADD www/index.js /home/node/
# RUN chmod +x /home/node/index.js
# VOLUME /home/node/index.js
### VOLUME /home/node/js
### VOLUME /home/node/statics
# Unexpected error  with Success & Nobuild
#VOLUME /home/node/js /home/node/statics     Unexpected error
#VOLUME ["/home/node/js/","/home/node/statics/"]   Unexpected error

EXPOSE 8000 8100 8200 8443

# CMD [ "pm2-docker", "js/index.js"]
CMD [ "nodemon", "-L", "--watch", "/home/node", "js/index.js"]
