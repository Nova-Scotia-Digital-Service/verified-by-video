# verified-by-video

Verify users liveliness and presence by choreographed video

## Setup

1. Make a copy of `env.template` named `.env` in the project root.

```
cp env.template .env
```

2. Create MinIO access keys

```
docker compose up minio
```

Log in to the MinIO console at `http://localhost:9001`. Use the root username and password from the `.env` file.

Create a new access key pair. Save the values to `.env` as `MINIO_ACCESS_KEY` and `MINIO_SECRET_ACCESS_KEY`.

3. Define the database

```
docker compose up postgres
yarn migrate up
```

Use the Postgres password from the `.env` file.

4. Populate the database (optional)

```
psql -h localhost -U postgres verified_by_video -f ./fixtures/example-data.sql
```

5. Restart and build all docker services

```
docker compose down
docker compose up --build
```

## Development

To build and run the development servers with Docker:

```
docker compose up --build
```

The frontend and backend will live-reload on changes.

Web interface: `http://localhost:3000`.

API Swagger UI: `http://localhost:3100/api/v1/`.

MinIO admin interface: [`http://localhost:9001`](http://localhost:9001).

The Postgres service is exposed on the default port `5432`.

To interact with the database:

```
psql -h localhost -U postgres verified_by_video
```

## Object Store

MinIO admin interface: [`http://localhost:9001`](http://localhost:9001).

[Create a bucket](http://localhost:9001/buckets/add-bucket) named `verified-by-video`.

[Create a user](http://localhost:9001/identity/users/add-user) for the api service to use and assign it the `readwrite` policy.

Create an access key for the user in the "Service Accounts" section of the user details. Save this access key & secret in `.env` as `MINIO_ACCESS_KEY` & `MINIO_SECRET_ACCESS_KEY`.

You will need to restart docker compose so the api service has the new MinIO keys.

## Testing

To check formatting:

```
yarn test:format
```

To run frontend test watcher:

```
docker compose run --build web yarn test
```

To run backend test watcher:

```
docker compose run --build api yarn test
```
