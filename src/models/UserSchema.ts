import mongoose from 'mongoose';

export interface IUser {
  username: string;
  password: string;
}

export interface IUserWithRefresh extends IUser {
  refreshToken?: string;
  refreshTokenExpires?: Date;
}

const UserSchema = new mongoose.Schema<IUserWithRefresh>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  refreshTokenExpires: { type: Date },
});

export default UserSchema;
