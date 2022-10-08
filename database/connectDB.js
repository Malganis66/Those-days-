import mongoose from 'mongoose'

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log('☠')
} catch (error) {
    console.log('mongoDB not connected')
}