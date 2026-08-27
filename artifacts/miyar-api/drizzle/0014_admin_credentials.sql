CREATE TABLE IF NOT EXISTS admin_credentials (
  id integer PRIMARY KEY DEFAULT 1 NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  password_hash text,
  reset_token_hash varchar(64),
  reset_expires_at timestamptz
);

INSERT INTO admin_credentials (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;
