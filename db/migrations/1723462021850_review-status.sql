-- Up Migration

ALTER TYPE review_status
    RENAME VALUE 'PENDING' to 'STARTED';

ALTER TYPE review_status
    ADD VALUE 'ESCALATED'
    AFTER 'STARTED';

ALTER TYPE review_status
    RENAME VALUE 'DENIED' to 'REJECTED';

