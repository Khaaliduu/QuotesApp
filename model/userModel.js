import mongoose from 'mongoose';


// Define User Schema
const userSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
      
  wishlist:[
    {
    //   course:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref: 'courses'
    //   }
    }
], // this is favrite 
});


// Export the model
const User = mongoose.model('User', userSchema);
export default User;