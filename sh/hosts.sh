#!/bin/bash
docker exec -u root $1 bash -c "echo 172.17.0.2 nginx.kyx >> /etc/hosts"
docker exec -u root $1 bash -c "echo 172.17.0.3 nodejs.kyx >> /etc/hosts"
docker exec -u root $1 bash -c "echo 172.17.0.4 mongo.kyx >> /etc/hosts"
docker exec $1 bash -c "cat /etc/hosts"
