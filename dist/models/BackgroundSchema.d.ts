import mongoose from 'mongoose';
export interface IBackground {
    url: string;
}
declare const BackgroundSchema: mongoose.Schema<IBackground, mongoose.Model<IBackground, any, any, any, mongoose.Document<unknown, any, IBackground, any, {}> & IBackground & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IBackground, mongoose.Document<unknown, {}, mongoose.FlatRecord<IBackground>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<IBackground> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default BackgroundSchema;
//# sourceMappingURL=BackgroundSchema.d.ts.map