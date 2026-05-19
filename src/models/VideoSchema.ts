import mongoose from 'mongoose';

export interface IVideo {
  title: string;
  url: string;
  createtime: string;
  updatetime?: string;
  albumart?: string;
}

const VideoSchema = new mongoose.Schema<IVideo>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  createtime: { type: String, required: true },
  updatetime: { type: String, required: false },
  albumart: { type: String, required: false },
});

export default VideoSchema;
