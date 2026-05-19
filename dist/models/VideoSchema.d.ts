import mongoose from 'mongoose';
export interface IVideo {
    title: string;
    url: string;
    createtime: string;
    updatetime?: string;
    albumart?: string;
}
declare const VideoSchema: mongoose.Schema<IVideo, mongoose.Model<IVideo, any, any, any, mongoose.Document<unknown, any, IVideo, any, {}> & IVideo & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IVideo, mongoose.Document<unknown, {}, mongoose.FlatRecord<IVideo>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<IVideo> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default VideoSchema;
//# sourceMappingURL=VideoSchema.d.ts.map