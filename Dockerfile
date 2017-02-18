FROM keyax/ubuntu_core

LABEL maintainer "yones.lebady AT gmail.com"
LABEL keyax.os "ubuntu core"
LABEL keyax.os.ver "16.10 yaketty"
LABEL keyax.vendor "Keyax"
LABEL keyax.app "Nodejs 7.4.0"
LABEL keyax.app.ver "2.1"

# RUN groupadd -r nodejs && useradd -r -g nodejs nodejs --create-home nodejs
RUN groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

# RUN apt-get update && apt-get install dirmngr

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
ENV NODE_VERSION 7.4.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

# RUN ["/bin/bash", "-c", "curl -SLO https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz; \
#   curl -SLO https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc; \
#   gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc"]
# RUN ["/bin/bash", "-c", "grep \\ node-v$NODE_VERSION-linux-x64.tar.xz\\$ SHASUMS256.txt | sha256sum -c -"]
# RUN ["/bin/bash", "-c", "tar -xJf node-v$NODE_VERSION-linux-x64.tar.xz -C /usr/local --strip-components=1"]
# RUN ["/bin/bash", "-c", "rm node-v$NODE_VERSION-linux-x64.tar.xz SHASUMS256.txt.asc SHASUMS256.txt"]
# RUN ["/bin/bash", "-c", "ln -s /usr/local/bin/node /usr/local/bin/nodejs"]
WORKDIR /home/node

RUN su node \
  && cd /home/node \
  && npm init --yes

RUN  npm install couchbase -g \
  && npm install express -g \
  && npm install http -g \
  && npm install https -g \
  && npm install jquery -g \
  && npm install nodemon -g \
#  && npm install mongodb -g \
#  && npm install mongoose -g \
  && npm install pm2 --no-optional -g
#  && npm install strongloop -g

COPY index.js /home/node/index.js
# RUN chmod +x /home/server.js

EXPOSE 80

CMD [ "pm2-docker", "index.js"]
# ENTRYPOINT ["cd /home"]
# CMD [ "slc start" ]
# CMD [ "pm2 start server.js" ]

VOLUME /home/node
