import mongoose from 'mongoose'

export default async function connection () {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected")
}