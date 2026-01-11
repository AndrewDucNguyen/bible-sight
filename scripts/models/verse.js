import mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const VerseSchema = new Schema({
    book: { required: true, type: String },
    chapter: { required: true, type: Number },
    verse: { required: true, type: Number },
    text: { required: true, type: String },
    translation: { required: true, type: String }
})