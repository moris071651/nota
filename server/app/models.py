import psycopg2 as db
from dotenv import load_dotenv
import os

env_path = os.path.join(os.path.dirname(__file__), '../../.env')
env_path = os.path.abspath(env_path)
load_dotenv(dotenv_path=env_path)

class Database:
    def __init__(self):
        self.conn = db.connect(
            host=os.getenv('POSTGRES_HOST'),
            database=os.getenv('POSTGRES_DB'),
            user=os.getenv('POSTGRES_USER'),
            password=os.getenv('POSTGRES_PASSWORD'),
            port=os.getenv('POSTGRES_PORT')
        )
        self.cur = self.conn.cursor()
        # create table if not exists
        self.cur.execute("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL, pass VARCHAR(255) NOT NULL)")
        self.cur.execute("CREATE TABLE IF NOT EXISTS notes (note_id SERIAL PRIMARY KEY NOT NULL, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id))")
        self.conn.commit()

    def get_user_by_id(self, id):
        self.cur.execute("SELECT * FROM users WHERE id = %s", (id,))
        return self.cur.fetchone()
    
    def get_user_by_name(self, name):
        self.cur.execute("SELECT * FROM users WHERE name = %s", (name,))
        return self.cur.fetchone()

    def create_user(self, name, password):
        self.cur.execute("INSERT INTO users (name, pass) VALUES (%s, %s)", (name, password))
        self.conn.commit()
        return self.cur.fetchone()

    
    def get_all_notes(self, user_id):
        self.cur.execute("SELECT * FROM notes WHERE user_id = %s", (user_id,))
        return self.cur.fetchall()
    
    def create_note(self, title, content, user_id):
        self.cur.execute("INSERT INTO notes (title, content, user_id) VALUES (%s, %s, %s)", (title, content, user_id))
        self.conn.commit()
        return self.cur.fetchone()
    
    def get_note_by_id(self, id, user_id):
        self.cur.execute("SELECT * FROM notes WHERE note_id = %s AND user_id = %s", (id, user_id))
        return self.cur.fetchone()
    
    def update_note_by_id(self, id, title, content, user_id):
        self.cur.execute("UPDATE notes SET content = %s, title = %s WHERE note_id = %s AND user_id = %s", (content, title, id, user_id))
        self.conn.commit()
        return self.cur.fetchone()
    
    def delete_note_by_id(self, id, user_id):
        self.cur.execute("DELETE FROM notes WHERE note_id = %s AND user_id = %s", (id, user_id))
        self.conn.commit()
        return self.cur.fetchone()

    def close(self):
        self.cur.close()
        self.conn.close()