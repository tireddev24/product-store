import mongoose from "mongoose";

const {Schema, model, models} = mongoose

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: [true, 'Email already exists!'],
        required: true
    },
    password : {
        type: String,
        required: true,
        // minlength: [8, "Password must be at least 8 characters long"],
        // match: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).+$/"

    },
    username : {
        type: String,
        required: true
        // default: 'user'
        // unique: [true, 'Username is in use!'],
    }
},
{timestamps: true})


const User = models.User || model('User', UserSchema)

export default User 