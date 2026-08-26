-- HZR Custom Concrete — panel schema (Cloudflare D1 / SQLite)
--
-- Apply to production:   npx wrangler d1 execute hzr-custom-concrete --remote --file=db/schema.sql
-- Apply to local dev:    npx wrangler d1 execute hzr-custom-concrete --local  --file=db/schema.sql
--
-- Every statement is idempotent (IF NOT EXISTS / INSERT OR IGNORE), so running
-- it again on a live database changes nothing and loses nothing.

-- ─────────────────────────────────────────────────────────────── quotes ──
-- Every submission from the website: the two estimate forms on the home page,
-- the contact page, and the form on every service page. `spec` is the JSON
-- list of key/value rows (property type, service, city), so the panel shows
-- the request exactly as the customer sent it.
CREATE TABLE IF NOT EXISTS quotes (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  product     TEXT    NOT NULL,                -- "Driveway or apron", "Patio or back yard"…
  spec        TEXT    NOT NULL DEFAULT '[]',   -- JSON [{key, value}]
  price       TEXT,                            -- unused here; kept so the shape matches the panel
  name        TEXT    NOT NULL,
  phone       TEXT    NOT NULL,                -- E.164
  phone_raw   TEXT,                            -- exactly what they typed
  email       TEXT,
  town        TEXT,
  notes       TEXT,
  source      TEXT    NOT NULL DEFAULT 'estimate',  -- estimate | contact | service
  status      TEXT    NOT NULL DEFAULT 'new',       -- new | contacted | scheduled | done
  note        TEXT,                                 -- private, panel only
  spam_via    TEXT,                                 -- set when the trap caught it; hides it from Requests
  spam_reason TEXT,                                 -- the AI's one-line reason, when there is one
  ip          TEXT,
  user_agent  TEXT,
  created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_quotes_created ON quotes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status  ON quotes (status);

-- ──────────────────────────────────────────────────────── review requests ──
-- Every review-request text handed to GoHighLevel, successful or not, plus
-- the tracked link, the star they gave, and where the follow-up ladder stands.
CREATE TABLE IF NOT EXISTS review_requests (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  quote_id     INTEGER,                 -- set when sent from a request row
  name         TEXT,
  phone        TEXT    NOT NULL,
  message      TEXT    NOT NULL,
  status       TEXT    NOT NULL,        -- sent | failed
  error        TEXT,
  token        TEXT,                    -- the /r/<token> short link
  clicked_at   TEXT,                    -- first tap on that link
  rating       INTEGER,                 -- 1..5, once they answer
  feedback     TEXT,                    -- private note from a low rating
  step         INTEGER NOT NULL DEFAULT 0,
  next_due_at  TEXT,                    -- when follow-up (step+1) fires
  stopped_at   TEXT,
  stop_reason  TEXT,                    -- clicked | rated | manual | exhausted | send_failed
  created_at   TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON review_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_quote   ON review_requests (quote_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_token ON review_requests (token);
-- The follow-up sweep reads exactly this: rows still running, with a rung due.
CREATE INDEX IF NOT EXISTS idx_reviews_due ON review_requests (next_due_at)
  WHERE stopped_at IS NULL;

-- ───────────────────────────────────────────────────────────── settings ──
-- Small key/value bag so every number and every line of text the panel sends
-- is editable from the panel instead of needing a redeploy.
CREATE TABLE IF NOT EXISTS settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

INSERT OR IGNORE INTO settings (key, value) VALUES
  -- Who gets texted when the website form is submitted and when a customer
  -- leaves low-star feedback. Anthony's line, the one on the site.
  ('owner_phone',    '+18055897879'),
  ('notify_owner',   '1'),

  -- When the follow-up sweep last ran. The clock rings every ten minutes;
  -- the panel shows this so you can see it is alive.
  ('last_sweep_at',  ''),

  -- What lands on Anthony's phone when a request comes in. {{link}} opens
  -- the panel on that exact request.
  ('owner_alert_template', 'New estimate request from {{name}} ({{phone}}): {{product}}. See it here: {{link}}'),

  -- What the customer gets back the moment their request clears the spam
  -- check. {{name}} becomes their first name.
  ('notify_customer', '1'),
  ('customer_confirm_template', 'Hi {{name}}, thank you for reaching out to HZR Custom Concrete. Anthony got your request and will get back to you as soon as possible. Any questions in the meantime, call or text 805-589-7879.'),

  -- The first review text. {{link}} is the tracked link to the rating page.
  ('review_template', 'Hi {{name}}, this is Anthony from HZR Custom Concrete. Thanks again for having us out. Mind telling us how we did? {{link}}'),

  -- Where a 4+ star rating gets sent. Blank until Anthony has a Google
  -- Business Profile review link; the rating page shows a thank-you instead
  -- until then. (A Yelp write-a-review link works here too.)
  ('google_review_url', ''),

  -- Rating page (the screen between the text and the review site). On by
  -- default.
  ('screening_enabled',   '1'),
  ('screening_threshold', '4'),
  ('screening_headline',  'How did we do?'),
  ('screening_sub',       'Tap a star. It takes a second and it genuinely helps an owner-run crew.'),
  ('screening_high_head', 'Thank you.'),
  ('screening_high_sub',  'Would you mind saying that in a review? It is the single biggest thing that helps a small crew like ours.'),
  ('screening_low_head',  'We want to put this right.'),
  ('screening_low_sub',   'Tell us what went wrong and it comes straight to Anthony, not to a public page.'),
  ('screening_done_head', 'Thank you.'),
  ('screening_done_sub',  'Anthony will see this and get back to you.'),

  -- The follow-up ladder. Hours are counted from the previous message.
  ('followup_1_hours', '24'),
  ('followup_2_hours', '24'),
  ('followup_3_hours', '48'),
  ('followup_1_template', 'Hi {{name}}, Anthony from HZR again. Did you get a chance to tell us how the job went? {{link}}'),
  ('followup_2_template', 'Hi {{name}}, one more nudge from HZR Custom Concrete. Thirty seconds is all it takes: {{link}}'),
  ('followup_3_template', 'Hi {{name}}, last time we will ask. If we did right by you, it would mean a lot: {{link}} Thanks either way.');
