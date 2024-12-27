-- Up Migration

CREATE TABLE submitters (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    license_number  char(14) NOT NULL,
    first_name      varchar(64) NOT NULL,
    last_name       varchar(64) NOT NULL,
    birthdate       date NOT NULL,
    street_address  varchar(64),
    locality        varchar(64),
    region          varchar(64),
    postal_code     varchar(64),
    country         varchar(64),
    expiry_date_dateint date,
    picture         text 
);

ALTER TABLE submissions
    ADD COLUMN submitter_id     uuid REFERENCES submitters ON DELETE RESTRICT

-- Down Migration

ALTER TABLE submissions
    DROP COLUMN submitter_id;

DROP TABLE submitters;
