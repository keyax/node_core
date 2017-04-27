docker run -tiP -v ~/github/node_core/app/index.js:/home/node/index.js \
                -v ~/github/node_core/app/js:/home/node/js \
                -v ~/github/node_core/app/pix:/home/node/pix \
                -v ~/github/node_core/app/css:/home/node/css \
                -v ~/github/node_core/app/fonts:/home/node/fonts \
                --name nodejs$1 --rm keyax/node_core
