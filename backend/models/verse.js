import mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const VerseSchema = new Schema({
    book: String,
    chapter: Number,
    verse: Number,
    text: String,
    translation: String

})

export default mongoose.model('Verse', VerseSchema, 'esv')