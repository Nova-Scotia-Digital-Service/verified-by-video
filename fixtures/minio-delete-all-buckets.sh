# Use `yarn minio:populate` to pipe this into docker

mc config host add minio http://minio:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD &&
mc rb --force --dangerous minio
