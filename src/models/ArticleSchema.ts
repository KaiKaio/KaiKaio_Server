import mongoose from 'mongoose';

export interface IArticle {
  title: string;
  description: string;
  content: string;
  createtime: string;
  updatetime?: string;
  cover?: string;
}

const ArticleSchema = new mongoose.Schema<IArticle>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  createtime: { type: String, required: true },
  updatetime: { type: String, required: false },
  cover: { type: String, required: false },
});

export default ArticleSchema;
