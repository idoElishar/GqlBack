import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';

interface ClickEntry {
  date: string;
  count: number;
}

const clickEntryJoiSchema = Joi.object({
  date: Joi.string().required(),
  count: Joi.number().min(0).required()
});

const productClicksJoiSchema = Joi.object({
  banner_id: Joi.string().required(),
  clicks: Joi.array().items(clickEntryJoiSchema).required()
});

export { productClicksJoiSchema };
export interface ProductClicks extends Document {
  banner_id: string;
  clicks: ClickEntry[];
}

const clickEntrySchema = new Schema<ClickEntry>({
  date: { type: String, required: true },
  count: { type: Number, required: true }
}, { _id: false });

const productClicksSchema = new Schema<ProductClicks>({
  banner_id: { type: String, required: true },
  clicks: [clickEntrySchema]
}, { versionKey: false });

const ProductClicksModel = mongoose.model<ProductClicks>('dateforbanner', productClicksSchema, 'dateforbanner');
export { ProductClicksModel };
