-- Up Migration

ALTER TABLE review_question_options
    ADD COLUMN valid       boolean NOT NULL DEFAULT false;

-- Down Migration

ALTER TABLE review_question_options
    DROP COLUMN valid;
