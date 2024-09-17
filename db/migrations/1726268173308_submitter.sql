-- Up Migration

CREATE TABLE submitters (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    license_number  char(14) NOT NULL,
    first_name      varchar(64) NOT NULL,
    last_name       varchar(64) NOT NULL,
    birthdate       date NOT NULL
);

ALTER TABLE submissions
    ADD COLUMN submitter_id     uuid REFERENCES submitters ON DELETE RESTRICT

-- Down Migration

ALTER TABLE submissions
    DROP COLUMN submitter_id;

DROP TABLE submitters;
