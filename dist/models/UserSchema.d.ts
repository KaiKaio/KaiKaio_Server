import mongoose from 'mongoose';
export interface IUser {
    username: string;
    password: string;
}
declare const UserSchema: mongoose.Schema<IUser, mongoose.Model<IUser, any, any, any, mongoose.Document<unknown, any, IUser, any, {}> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser, mongoose.Document<unknown, {}, mongoose.FlatRecord<IUser>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<IUser> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default UserSchema;
//# sourceMappingURL=UserSchema.d.ts.map