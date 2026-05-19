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

const CommentSchema = new mongoose.Schema<IComment>({
  userName: { type: String, required: true },
  site: { type: String, required: false },
  email: { type: String, required: false },
  content: { type: String, required: true },
  createDate: { type: String, required: true },
  agent: { type: String, required: false },
  ip_location: { type: String, required: false },
  pid: { type: String, required: true },
});

export default CommentSchema;
