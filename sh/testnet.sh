# needs key-value service : consul, etcd, zookeeper to run swarm overlay network
# swarm mode is easier and manages the cluster without key-value store.
docker network create -d overlay --subnet=10.10.1.1/16 --ip-range=10.10.1.1/24 --gateway=10.10.1.1 kyxnet

