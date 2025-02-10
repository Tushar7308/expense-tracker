import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  firstName:string;
  lastName:string;
  password:string;
  createdAt: Date;
  email:string;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password:{type:String,required:true},
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
