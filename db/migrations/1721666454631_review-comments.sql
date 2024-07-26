-- Up Migration

CREATE TABLE review_comments (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id   uuid REFERENCES reviews NOT NULL,
    reviewer_id uuid REFERENCES users NOT NULL,
    text        text
);

-- Down Migration

DROP TABLE review_comments;