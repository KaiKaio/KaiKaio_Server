import mongoose from 'mongoose';
export interface IMusic {
    title: string;
    url: string;
    singer?: string;
    lrc?: string;
    createtime: string;
    updatetime?: string;
    delname: string;
    albumart?: string;
    sortIndex: number;
}
declare const MusicSchema: mongoose.Schema<IMusic, mongoose.Model<IMusic, any, any, any, mongoose.Document<unknown, any, IMusic, any, {}> & IMusic & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IMusic, mongoose.Document<unknown, {}, mongoose.FlatRecord<IMusic>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<IMusic> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default MusicSchema;
//# sourceMappingURL=MusicSchema.d.ts.map