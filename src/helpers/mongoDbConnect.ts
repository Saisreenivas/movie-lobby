import mongoose from "mongoose"
import { MONGODB_CONFIG } from "../config"


const mongoDbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_CONFIG.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
  }
}

export default mongoDbConnect