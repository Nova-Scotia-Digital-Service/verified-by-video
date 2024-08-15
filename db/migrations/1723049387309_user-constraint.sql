-- Up Migration

ALTER TABLE users DROP CONSTRAINT users_email_key;

-- Down Migration

ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);
