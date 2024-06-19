-- Up Migration

CREATE TABLE review_answers (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    option_id   uuid REFERENCES review_question_options NOT NULL
);

-- Down Migration

DROP TABLE review_answers;
