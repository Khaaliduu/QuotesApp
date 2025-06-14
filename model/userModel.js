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
        type: Number,
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
    wishlist: [
      {
        quote: {
          type: mongoose.Schema.Types.ObjectId,
          required:true,

          ref: "Quote",
        },
      },
    ],
    // is is favrite 
});


// Export the model
const Users = mongoose.model('users', userSchema);
export default Users;