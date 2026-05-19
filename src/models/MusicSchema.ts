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

const MusicSchema = new mongoose.Schema<IMusic>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  singer: { type: String, required: false },
  lrc: { type: String, required: false },
  createtime: { type: String, required: true },
  updatetime: { type: String, required: false },
  delname: { type: String, required: true },
  albumart: { type: String, required: false },
  sortIndex: { type: Number, required: true },
});

export default MusicSchema;
