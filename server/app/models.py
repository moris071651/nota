import psycopg2 as db

class Database:
    def __init__(self):
        self.conn = db.connect("dbname=postgres user=postgres password=postgres")
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
        self.cur.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (name, password))
        self.conn.commit()
        return self.cur.fetchone()

    def update_user(self, id, name, password):
        self.cur.execute("UPDATE users SET name = %s, email = %s WHERE id = %s", (name, password, id))
        self.conn.commit()
        return self.cur.fetchone()

    def delete_user(self, id):
        self.cur.execute("DELETE FROM users WHERE id = %s", (id,))
        self.conn.commit()
        return self.cur.fetchone()

    def close(self):
        self.cur.close()
        self.conn.close()