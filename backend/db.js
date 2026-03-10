import Database from "better-sqlite3";

const db = new Database("./db.db");

const create_student_table = db.prepare(`
CREATE TABLE IF NOT EXISTS student (
  student_id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  PASSWORD TEXT NOT NULL
);`);

const create_session_table = db.prepare(`
CREATE TABLE IF NOT EXISTS session (
  session_id INTEGER PRIMARY KEY AUTOINCREMENT, 
  place TEXT NOT NULL, 
  time TEXT NOT NULL,
  is_online INTEGER NOT NULL
);`);

const create_session_user_bridge = db.prepare(`
CREATE TABLE IF NOT EXISTS student_session (
  student_id TEXT, 
  session_id TEXT, 
  PRIMARY KEY (student_id, session_id), 
  FOREIGN KEY (student_id) 
    REFERENCES student (student_id) 
      ON UPDATE CASCADE 
      ON DELETE CASCADE, 
  FOREIGN KEY (session_id) 
    REFERENCES session (session_id) 
      ON UPDATE CASCADE 
      ON DELETE CASCADE,
  UNIQUE(student_id, session_id)
);`)

create_student_table.run();
create_session_table.run();
create_session_user_bridge.run();
export default db;