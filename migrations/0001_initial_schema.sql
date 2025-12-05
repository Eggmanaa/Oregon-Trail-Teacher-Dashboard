-- Oregon Trail Teacher Interface Database Schema

-- Games table (class periods/sessions)
CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  period TEXT NOT NULL,
  start_date TEXT NOT NULL,
  current_day INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active' CHECK (status IN ('setup', 'active', 'completed', 'archived')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Wagon trains table (student groups within a game)
CREATE TABLE IF NOT EXISTS wagon_trains (
  id TEXT PRIMARY KEY,
  game_id TEXT NOT NULL,
  name TEXT NOT NULL,
  current_location_id TEXT DEFAULT 'independence',
  current_location_index INTEGER DEFAULT 0,
  days_traveled INTEGER DEFAULT 0,
  cash REAL DEFAULT 0,
  vp INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'arrived', 'failed')),
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- Characters table (party members in wagon trains)
CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY,
  wagon_train_id TEXT NOT NULL,
  name TEXT NOT NULL,
  job_id TEXT NOT NULL,
  job_name TEXT NOT NULL,
  nationality_id TEXT,
  religion_id TEXT,
  health INTEGER NOT NULL,
  max_health INTEGER NOT NULL,
  skills TEXT, -- JSON array
  status_effects TEXT, -- JSON array
  is_alive INTEGER DEFAULT 1,
  role TEXT DEFAULT 'member' CHECK (role IN ('leader', 'spouse', 'child', 'member', 'npc')),
  weapon TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (wagon_train_id) REFERENCES wagon_trains(id) ON DELETE CASCADE
);

-- Inventory table (items in wagon trains)
CREATE TABLE IF NOT EXISTS inventory (
  id TEXT PRIMARY KEY,
  wagon_train_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  item_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  category TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (wagon_train_id) REFERENCES wagon_trains(id) ON DELETE CASCADE
);

-- Game events log
CREATE TABLE IF NOT EXISTS game_events (
  id TEXT PRIMARY KEY,
  game_id TEXT NOT NULL,
  wagon_train_id TEXT,
  event_type TEXT NOT NULL,
  event_data TEXT, -- JSON
  day INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
  FOREIGN KEY (wagon_train_id) REFERENCES wagon_trains(id) ON DELETE SET NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_wagon_trains_game_id ON wagon_trains(game_id);
CREATE INDEX IF NOT EXISTS idx_characters_wagon_train_id ON characters(wagon_train_id);
CREATE INDEX IF NOT EXISTS idx_inventory_wagon_train_id ON inventory(wagon_train_id);
CREATE INDEX IF NOT EXISTS idx_game_events_game_id ON game_events(game_id);
CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
