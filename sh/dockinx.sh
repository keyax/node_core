#docker run -tid -p 80:80 --name nginx$1 --rm keyax/nginx_core
docker run -ti -p 80:80 \
                -v ~/github/nginx_core/etc/nginx:/etc/nginx \
                -v ~/github/nginx_core/var_www:/var/www \
                -v ~/github/nginx_core/var_www/js:/var/www/js \
                -v ~/github/nginx_core/var_www/img:/var/www/img \
                -v ~/github/nginx_core/var_www/css:/var/www/css \
                -v ~/github/nginx_core/var_www/fonts:/var/www/fonts \
                --name nginx$1 --rm keyax/nginx_core




