-- Up Migration

CREATE TABLE sessions (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at      timestamptz NOT NULL DEFAULT transaction_timestamp(),
    expires_at      timestamptz NOT NULL DEFAULT transaction_timestamp() + '10 minutes'::interval
);

CREATE TABLE prompts (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id      uuid REFERENCES sessions ON DELETE RESTRICT NOT NULL,
    text            varchar(255) NOT NULL
);

CREATE TABLE submissions (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id      uuid REFERENCES sessions ON DELETE RESTRICT NOT NULL,
    video_url       varchar(255) NOT NULL,
    upload_date     timestamptz NOT NULL DEFAULT transaction_timestamp()
);

CREATE TABLE identification_cards (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id   uuid REFERENCES submissions NOT NULL,
    description     varchar(255) NOT NULL,
    photo_url       varchar(255) NULL,
    upload_date     timestamptz NULL DEFAULT transaction_timestamp()
);

CREATE TYPE review_status AS ENUM ('PENDING', 'APPROVED', 'DENIED');

CREATE TABLE reviews (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id   uuid REFERENCES submissions NOT NULL,
    status          review_status NOT NULL DEFAULT 'PENDING'
);

CREATE TABLE review_questions (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id       uuid REFERENCES reviews NOT NULL,
    question        varchar(1024) NOT NULL
);

CREATE TABLE review_question_options (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    review_question_id  uuid REFERENCES review_questions NOT NULL,
    text                varchar(1024) NOT NULL
);

-- Down Migration

DROP TABLE review_question_options;
DROP TABLE review_questions;
DROP TABLE reviews;
DROP TABLE identification_cards;
DROP TABLE submissions;
DROP TABLE prompts;
DROP TABLE sessions;
DROP TYPE review_status;
