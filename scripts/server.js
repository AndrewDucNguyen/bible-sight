import mongoose from 'mongoose';
import app from './src/app.js'

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bible-sight';

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB...');
    app.listen(PORT, () => {
        console.log('Listening on port', PORT);
    })
})
.catch((err) => {
    console.log(err)
    process.exit(1);
})