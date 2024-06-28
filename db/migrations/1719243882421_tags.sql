-- Up Migration

CREATE TABLE tags (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    text        varchar(32) NOT NULL
);

CREATE TABLE review_tags (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id   uuid REFERENCES reviews NOT NULL,
    tag_id      uuid REFERENCES tags NOT NULL
);

-- Down Migration

DROP TABLE review_tags;
DROP TABLE tags;
