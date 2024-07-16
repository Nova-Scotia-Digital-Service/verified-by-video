# verified-by-video

Verify users liveliness and presence by choreographed video

## Setup

1. Make a copy of `env.template` named `.env` in the project root.

```
cp env.template .env
```

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

Optionally populate the database and object store with example data

```
yarn db:populate
yarn minio:populate
```

5. Log in

The default users on dev (defined in `./fixtures/keycloak-dev-realm.json`) are:

username: `user`
password: `password123`

and

username: `admin`
password: `password123`

You can add users to keycloak with `yarn create-user`:

```
yarn create-user developer@domain.tld somepassword true
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

## Database

To interact with the database:

- `yarn db:psql`: Postgres interactive terminal
- `yarn db:drop`: Drops the verified_by_video table
- `yarn db:create`: Creates the verified_by_video table
- `yarn db:migrate up`: Applies database schema migrations
- `yarn db:populate`: Loads example data into the database
- `yarn db:full-reset`: Drops & recreates database and loads example data

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
