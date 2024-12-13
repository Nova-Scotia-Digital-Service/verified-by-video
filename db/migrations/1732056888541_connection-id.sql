-- Up Migration

ALTER TABLE sessions
    ADD COLUMN didcomm_connection_id uuid;

-- Down Migration

ALTER TABLE sessions
    DROP COLUMN didcomm_connection_id;
