import mongoose from 'mongoose';

export interface IBackground {
  url: string;
}

const BackgroundSchema = new mongoose.Schema<IBackground>({
  url: { type: String, required: true },
});

export default BackgroundSchema;
