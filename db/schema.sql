BEGIN;
    CREATE TABLE sessions (
        id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at      timestamptz NOT NULL DEFAULT transaction_timestamp(),
        expires_at      timestamptz NOT NULL DEFAULT transaction_timestamp() + '10 minutes'::interval
    );
COMMIT;
