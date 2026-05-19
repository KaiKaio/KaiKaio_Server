import mongoose from 'mongoose';
export interface IComment {
    userName: string;
    site?: string;
    email?: string;
    content: string;
    createDate: string;
    agent?: string;
    ip_location?: string;
    pid: string;
}
declare const CommentSchema: mongoose.Schema<IComment, mongoose.Model<IComment, any, any, any, mongoose.Document<unknown, any, IComment, any, {}> & IComment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IComment, mongoose.Document<unknown, {}, mongoose.FlatRecord<IComment>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<IComment> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default CommentSchema;
//# sourceMappingURL=CommentSchema.d.ts.map