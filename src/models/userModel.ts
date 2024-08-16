import mongoose, {Schema, Document, Mongoose} from "mongoose";

export interface IUser extends Document{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVerified: boolean;
    verifyToken: string;
    verifyTokenExpiry: Date;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    firstName: {
        type: String,
        required: [true, "FirstName is required"],
    },
    lastName: {
        type: String,
        required: [true, "LastName is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
});

const User = (mongoose.models.users as mongoose.Model<IUser>)  || mongoose.model<IUser>("users", UserSchema);
export default User;