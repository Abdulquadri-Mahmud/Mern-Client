import mongoose from "mongoose";

// creating rules for user
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
}, {timestamps : true});

//Export the model
// module.exports = mongoose.model('User', userSchema);
const User = mongoose.model('User', userSchema);

export default User;