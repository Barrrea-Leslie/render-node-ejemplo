import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Offroad Kantapon');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server on port " + PORT);
});
