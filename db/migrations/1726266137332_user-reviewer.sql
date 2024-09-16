-- Up Migration

ALTER TABLE users
    RENAME TO reviewers;

-- Down Migration

ALTER TABLE reviewers
    RENAME TO users;
