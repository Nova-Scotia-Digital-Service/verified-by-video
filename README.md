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

To load the database schema and example data:

```
psql -h localhost -U postgres verified_by_video -f ./db/schema.sql
psql -h localhost -U postgres verified_by_video -f ./db/fixtures/example-data.sql
```
