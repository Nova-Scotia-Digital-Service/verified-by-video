# verified-by-video

Verify users liveliness and presence by choreographed video

## Setup

Make a copy of `env.template` named `.env` in the project root.

```
cp env.template .env
```

## Development

To build and run the development servers with Docker:

```
docker compose up --build
```

The frontend and backend will live-reload on changes.

Web interface: `http://localhost:3000`.

API Swagger UI: `http://localhost:3100/api/v1/`.

## Database

The Postgres service is exposed on the default port `5432`.

To load the database schema:

```
yarn migrate up
```

To populate the database with example data (optional):

```
psql -h localhost -U postgres verified_by_video -f ./db/fixtures/example-data.sql
```

## Object Store

MinIO admin interface: [`http://localhost:9001`](http://localhost:9001).

[Create a bucket](http://localhost:9001/buckets/add-bucket) named `verified-by-video`.

[Create a user](http://localhost:9001/identity/users/add-user) for the api service to use and assign it the `readwrite` policy.

Create an access key for the user in the "Service Accounts" section of the user details. Save this access key & secret in `.env` as `MINIO_ACCESS_KEY` & `MINIO_SECRET_ACCESS_KEY`.

You will need to restart docker compose so the api service has the new MinIO keys.
