-- Up Migration

CREATE TABLE submission_tags (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id   uuid REFERENCES submissions NOT NULL,
    tag_id          uuid REFERENCES tags NOT NULL
);

DROP TABLE review_tags;

-- Down Migration

CREATE TABLE review_tags (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id   uuid REFERENCES reviews NOT NULL,
    tag_id      uuid REFERENCES tags NOT NULL
);

DROP TABLE submission_tags;
