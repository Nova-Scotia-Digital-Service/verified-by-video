# verified-by-video

Verify users liveliness and presence by choreographed video

## Setup

### Local setup

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

### Setup using docker

1. Make a copy of `env.template` named `.env` in the project root.

```
cp env.template .env
```

2. Build and start docker containers

```
docker compose up --build
```

3. Wait until the containers have started and then run this command on the host machine to initialize the database

```
yarn db:migrate up
```

Or

```
npm run  db:migrate up
```

Optionally populate the database and object store with example data

```
yarn db:populate
yarn minio:populate
```

## Running the web app

Log in

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
- `yarn db:full-reset`: Drops & recreates database schema
- `yarn db:populate`: Loads example data into the database

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

## Digital Credentials

Point Traction to the VbV Controller for DRPC message
handling: Test with (no trailing slash):

https://vbc-controller.fullboar.ca/api/v1

Test with:

```bash
curl -v -sL -X POST https://vbc-controller.fullboar.ca/api/v1/topic/ping
```

This should return a 202 No Content response.
