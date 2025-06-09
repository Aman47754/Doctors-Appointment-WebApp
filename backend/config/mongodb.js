import mongoose from "mongoose";
import 'dotenv/config'
const connectDB=async ()=>{
    await mongoose.connect(`${process.env.MONGODB_URL}/prescripto`)
    .then(()=>console.log("DB Connected"))
    .catch((err)=>{
        console.log("DB Connection Error: "+err.message);
        process.exit(1);
    })
}
export default connectDB