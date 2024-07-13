# verified-by-video

Verify users liveliness and presence by choreographed video

## Setup

1. Make a copy of `env.template` named `.env` in the project root.

```
cp env.template .env
```

Create a secure, random, secret key for signing & verifiying JWTs.
Add that key to `.env` as the value for `JWT_SECRET_KEY`.

2. Install dependencies

```
yarn install
```

3. Start the services

```
yarn start
```

4. Initialize the database

```
yarn db:migrate up
```

Optionally populate the database with example data

```
yarn db:populate
```

## Development

To build and run the development servers with Docker:

```
yarn start
```

The frontend and backend will live-reload on changes.

Web interface: `http://localhost:3000`.

API Swagger UI: `http://localhost:3100/api/v1/`.

MinIO admin interface: [`http://localhost:9001`](http://localhost:9001).

The Postgres service is exposed on the default port `5432`.

To interact with the database:

```
yarn db:psql
```

## Testing

To check formatting:

```
yarn check-format
```

To run tests:

```
yarn test:web
yarn test:api
```
