FROM keyax/ubuntu_core

LABEL maintainer="yones.lebady AT gmail.com" \
      keyax.os="ubuntu core" \
      keyax.os.ver="16.10 yaketty" \
      keyax.vendor="Keyax" \
      keyax.app="Nodejs 7.4.0" \
      keyax.app.ver="2.1"

# RUN groupadd -r nodejs && useradd -r -g nodejs nodejs --create-home nodejs
RUN groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

# gpg keys listed at https://github.com/nodejs/node
RUN ["/bin/bash", "-c",  "set -ex; \
  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 94AE36675C464D64BAFA68DD7434390BDBE9B9C5; \
  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B9AE9905FFD7803F25714661B63B535A4C206CA9; \
  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 71DCFD284A79C3B38668286BC97EC7A07EDE3FC1; \
  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93; \
  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8; \
  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys DD8F2338BAE7501E3DD5AC78C273792F7D83545D"]

#  &&   for key in \
#    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
#    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
#    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
#    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
#    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
#    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
#    9554F04D7259F04124DE6B476D5A82AC7E37093B \
#    FD3A5288F042B6850C66B31F09FE44734EB7990E \
#  ;  do gpg --keyserver ha.pool.sks-keyservers.net --recv-keys $key ; done
#    apt-key adv --recv-key --keyserver pool.sks-keyservers.net $key || \
#    apt-key adv --recv-key --keyserver pgp.mit.edu $key || \
#    apt-key adv --recv-key --keyserver keyserver.pgp.com $key

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 7.5.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

  RUN apt-get update && apt-get install --assume-yes --no-install-recommends \
  # for building Couchbase Nodejs driver from source : manke gcc ...
      build-essential \
      && apt-get autoremove && apt-get clean \
  # delete all the apt list files since they're big and get stale quickly
    	&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
  # this forces "apt-get update" in dependent images, which is also good

RUN npm install -g nodemon && \
    npm install -g --no-optional pm2 && \
#   npm install strongloop -g \
    npm install --save http && \
    npm install --save https && \
    npm install --save jquery && \
    npm install --save express && \
    npm install --save couchbase && \
    npm install --save leaflet && \
    npm install --save couchbase-promises && \
# npm install couchbase --no-bin-links
# RUN npm install "git+https://github.com/couchbase/couchnode.git#master"
# && npm install -g ottoman
# npm install prebuild
# && npm install mongodb -g \
# && npm install mongoose -g \
    su node
# RUN su node \
#  && cd /home/node \
#  && npm init --yes

# COPY index.js /home/node/index.js
# RUN chmod +x /home/server.js

WORKDIR /home/node
VOLUME /home/node
EXPOSE 80
# CMD [ "pm2-docker", "index.js"]
CMD [ "nodemon", "-L", "--watch", "/home/node", "index.js"]
