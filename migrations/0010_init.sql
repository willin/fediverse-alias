CREATE TABLE `aliases` (
	`alias` text NOT NULL PRIMARY KEY,
  `owner` text NOT NULL,
	`account` text NOT NULL,
	`valid` integer DEFAULT 1,
	`created_at` INTEGER NOT NULL DEFAULT current_timestamp
);

CREATE INDEX IF NOT EXISTS idx_aliases_user ON aliases(`owner`, `created_at`);
CREATE INDEX IF NOT EXISTS idx_aliases_owner ON aliases(`owner`, `alias`);
CREATE INDEX IF NOT EXISTS idx_aliases_status ON aliases(`alias`, `valid`);
