-- Up Migration

ALTER TABLE reviews
    ADD COLUMN reviewer_id      uuid REFERENCES users NULL;

-- Down Migration

ALTER TABLE reviews
    DROP COLUMN reviewer_id;
