import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  name: { type: String, required: true },
  role: { type: String, enum: ['Super Admin', 'Content Manager', 'Admission Officer'], default: 'Content Manager' },
});
const User = mongoose.model('User', userSchema);

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB Connected.');
    const admin = await User.findOne({ username: 'admin' });
    console.log('Admin user:', admin);
    process.exit(0);
  });
