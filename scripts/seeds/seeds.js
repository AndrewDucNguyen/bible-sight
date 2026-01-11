import fs from 'fs'
import path from 'path';
import mongoose from 'mongoose'
import {VerseSchema} from '../models/verse.js'

// Get the full path from this file
const __dirname = path.resolve()

const seed = async () =>  {
    try {
        // Connect to Bible-Sight DB
        await mongoose.connect("mongodb://127.0.0.1:27017/bible-sight");
        console.log('MongoDB Connected!')

        const translations = fs.readdirSync(__dirname).filter(file =>
            fs.statSync(path.join(__dirname, file)).isDirectory()
        );

        for (const translation of translations) {
            const VerseModel = mongoose.model('Verse', VerseSchema, translation.toLowerCase())
            // Join the dir path with where I want to grab the files
            const seedsPath = path.join(__dirname, `/${translation}`)
            // Grab all the info from the seedsPath dir
            const files = fs.readdirSync(seedsPath)

            // Delete everything in the collection so no duplicates
            await VerseModel.deleteMany({})


            // Loop through all the files
            for (const file of files) {

                // If the file doesn't end with .json then skip it
                if (!file.endsWith('.json')) continue;

                // Get the book name by removing the .json at the end
                const bookName = file.replace('.json', '').replace(/_/g, ' ');
                // Join the seedsPath with the filename so it can grab it
                const filePath = path.join(seedsPath, file);
                // Read raw JSON file
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

                const verses = []

                // Loop through the object array and set it to correct key: value pair object
                for (const [chapter, verseObject] of Object.entries(data)) {
                    for (const [verse, text] of Object.entries(verseObject)){
                        // Skip entries with empty or whitespace-only text
                        if (!text || typeof text !== 'string' || text.trim() === '') {
                            continue;
                        }
                        verses.push({
                            book: bookName,
                            chapter: Number(chapter),
                            verse: Number(verse),
                            text,
                            translation: translation
                        });
                    }
                }

                // Insert into Verses collection. Mongoose makes this schema name into its own collection from the
                // connection above
                console.log(verses, 'verses after')
                await VerseModel.insertMany(verses)
                console.log(`Seeded the book of ${bookName}`)
            }

        }
    }
    catch (error) {
        console.error(error)
    }
    finally {
        // Close out the connect when finished
        await mongoose.connection.close();
        console.log('MongoDB Disconnected!')
    }
}

// Call the seed function
await seed();