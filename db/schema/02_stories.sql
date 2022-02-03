DROP TABLE IF EXISTS stories CASCADE;

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Do we want the stories to be deleted if creator deletes account?
  title VARCHAR(255) NOT NULL,
  initial_content TEXT,
  complete BOOLEAN NOT NULL DEFAULT FALSE
);
