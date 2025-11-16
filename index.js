import { config } from 'dotenv';
import express from 'express';
import pg from 'pg';

config()

const app = express();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

app.get('/', (req, res) => {
    res.send('Offroad Kantapon');
});

app.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT NOW()')
    return res.json(result.rows[0])
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server on port " + PORT);
});
