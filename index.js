import express from 'express';
import pg from 'pg';

import { config } from 'dotenv';
config()

const app = express();

//Conexion a postgress sql - con el enlace externo
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL, //Esta variable esta en .env
    ssl: { rejectUnauthorized: false } //Debe de tener este para render, si no hay problemas de depliegue, para desarollo esta bien dejarlo en true
})

//crear tabla de usuarios en postgress en render - (buscvar otra manera de hacerlo depsues)

const IniciarUsuariosBD = async (req, res) => {

    try {
        
        await pool.query(`
        
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
        
        `);

        console.log("La tabla usuarios fue creada o ya existe");

    } catch (error) {
        console.error('Error al crear la tabla: ', error);
    }


}

IniciarUsuariosBD();


//Que se meustra en la pantalla, esto se muestra cuando entras al local3000 y cuando entras a la liga que dio render
app.get('/', (req, res) => {
    res.send('Offroad Kantapon');
});

//esto hace que se muestre la hora tomada de la base de datos de postgres en render
//recuerda que se deben hacer funciones asycn
app.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT NOW()')
    return res.json(result.rows[0])
});

//Esto e spara el servidor local
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server on port " + PORT);
});



