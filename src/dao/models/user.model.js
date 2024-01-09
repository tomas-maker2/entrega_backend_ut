import mongoose from "mongoose";

const userCollection = 'personas';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {type: String, require: true, unique: true },
    age: Number,
    password: {type: String, require: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role: {
        type: String,
        enum: ['regular', 'premium'],
        default: 'regular',
    },
    canCreateProduct: {
        type: Boolean,
        default: false
    },
    documents: [
        {
            name: String,
            reference: String,
        }
    ],
    last_connection: Date,
});

userSchema.method.updateLastConnection = function() {
    this.last_connection = new Date();
    return this.save();
}

const userModel = mongoose.model(userCollection, userSchema);

export { userModel }