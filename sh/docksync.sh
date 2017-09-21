# first time to initialize user and sampleBuckets
# docker run -d -v /opt/couchbase/var:/opt/couchbase/var -P keyax/couchbase_core
# to rerun the databases 
docker run -tiP -v ~/github/couchbase_sync/etc/sync_gateway:/etc/sync_gateway keyax/couchbase_sync
