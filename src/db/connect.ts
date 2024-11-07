import mongoose from 'mongoose'

const MULTER_URL = "mongodb+srv://user:root1234@cluster0.oqq1mdt.mongodb.net/cloudImage?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = () => {
  return mongoose.connect(MULTER_URL)
}

export default connectDB;