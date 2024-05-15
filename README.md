# verified-by-video

Verify users liveliness and presence by choreographed video

## Setup

Make a copy of `env.template` named `.env` in the project root.

```
cp env.template .env
```

## Development

Install:

```
yarn
```

Run development server:

```
yarn start
```

Run the postgres service:

```
docker compose up postgres --build
```

## Docker

To build and serve the app with Docker:

```
docker compose up --build
```

## Database

The Postgres service is exposed on the default port `5432`.

To load the database schema and example data:

```
psql -h localhost -U postgres verified_by_video -f ./db/schema.sql
psql -h localhost -U postgres verified_by_video -f ./db/fixtures/example-data.sql
```
