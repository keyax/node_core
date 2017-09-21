docker image rm -f keyax/node_core
docker run -ti -p 9000:9000 `#-v ~/github/node_core/www/index.js:/home/node/index.js` \
                -v ~/github/node_core/www/js:/home/node/js/ \
                -v ~/github/node_core/www/img:/home/node/img/ \
                -v ~/github/node_core/www/css:/home/node/css/ \
                -v ~/github/node_core/www/fonts:/home/node/fonts/ \
                -v ~/github/node_core/www/data:/home/node/data/ \
                --name nodejs$1 --rm keyax/node_core
