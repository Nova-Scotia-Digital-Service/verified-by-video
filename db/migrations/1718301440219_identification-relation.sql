-- Up Migration

ALTER TABLE identification_cards
    ADD COLUMN session_id   uuid REFERENCES sessions NULL;

UPDATE identification_cards
    SET session_id = (
        SELECT submissions.session_id FROM submissions
            WHERE submissions.id = identification_cards.submission_id
        );

ALTER TABLE identification_cards
    ALTER COLUMN session_id SET NOT NULL;

ALTER TABLE identification_cards
    DROP COLUMN submission_id;

-- Down Migration

ALTER TABLE identification_cards
    ADD COLUMN submission_id    uuid REFERENCES submissions NULL;

UPDATE identification_cards
    SET submission_id = (
        SELECT submissions.id FROM submissions
            WHERE submissions.session_id = identification_cards.session_id
        );

ALTER TABLE identification_cards
    ALTER COLUMN submission_id SET NOT NULL;

ALTER TABLE identification_cards
    DROP COLUMN session_id;
