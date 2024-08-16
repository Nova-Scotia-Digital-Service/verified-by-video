-- Up Migration

ALTER TABLE reviews
    ADD COLUMN created_at      timestamptz NOT NULL DEFAULT transaction_timestamp()

-- Down Migration

ALTER TABLE reviews
    DROP COLUMN created_at;
