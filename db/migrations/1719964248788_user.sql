-- Up Migration

CREATE TABLE users (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email       varchar(255) UNIQUE NOT NULL,
    full_name   varchar(255) NOT NULL,
    is_admin    boolean DEFAULT false NOT NULL
);

-- Down Migration

DROP TABLE users;
