-- Up Migration

CREATE TABLE IF NOT EXISTS credentials (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at      timestamptz NOT NULL DEFAULT transaction_timestamp(),
    didcomm_connection_id   uuid  NOT NULL,
    session_id      uuid REFERENCES sessions ON DELETE RESTRICT NOT NULL
  
);
