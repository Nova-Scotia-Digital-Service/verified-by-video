-- Up Migration

CREATE TYPE submission_status AS ENUM ('NEW', 'UNDER_REVIEW', 'ESCALATED', 'APPROVED', 'REJECTED');

ALTER TABLE submissions
    ADD COLUMN status       submission_status NOT NULL DEFAULT 'NEW';

-- Down Migration

ALTER TABLE submissions
    DROP COLUMN status;

DROP TYPE submission_status;
