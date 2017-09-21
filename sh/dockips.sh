docker ps --format "{{.ID}}" | while read pso; do docker inspect $pso | grep 'keyax.app"\|IPAddress"';done
