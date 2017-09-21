# first time to initialize user and sampleBuckets
# docker run -d -v /opt/couchbase/var:/opt/couchbase/var -P keyax/couchbase_core
# to rerun the databases 
docker run -tiP --memory-swappiness=0 -v /opt/couchbase/var:/opt/couchbase/var keyax/couchbase_core couchbase-server
