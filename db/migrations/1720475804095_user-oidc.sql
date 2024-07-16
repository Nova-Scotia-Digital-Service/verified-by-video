-- Up Migration

ALTER TABLE users
    ADD COLUMN keycloak_id      uuid UNIQUE;

-- Down Migration

ALTER TABLE users
    DROP COLUMN keycloak_id
