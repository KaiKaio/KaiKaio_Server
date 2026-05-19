import mongoose from 'mongoose';
export interface IArticle {
    title: string;
    description: string;
    content: string;
    createtime: string;
    updatetime?: string;
    cover?: string;
}
declare const ArticleSchema: mongoose.Schema<IArticle, mongoose.Model<IArticle, any, any, any, mongoose.Document<unknown, any, IArticle, any, {}> & IArticle & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IArticle, mongoose.Document<unknown, {}, mongoose.FlatRecord<IArticle>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<IArticle> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default ArticleSchema;
//# sourceMappingURL=ArticleSchema.d.ts.map