import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : { type: String },
    birthday : { type: Date, required: true },
    adress : { type: String },
    city : { type: String },
    phone : { type: String }
});

mongoose.model('User', UserSchema);