import mongoose from 'mongoose';
import express from 'express';

const app = express()

// app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bible API is running!')
})

export default app;