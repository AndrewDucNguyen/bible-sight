import mongoose from 'mongoose';
import express from 'express';

const app = express()

app.get('/', (req, res) => {
    res.send('Bible API is running!')
})

export default app;