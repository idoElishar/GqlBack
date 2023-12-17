import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';

const productClickJoiSchema = Joi.object({
    date: Joi.string().required(),
    count: Joi.number().min(0).required()
});

const productClicksJoiSchema = Joi.object({
    banner_id: Joi.string().required(),
    clicks: Joi.array().items(productClickJoiSchema).required()
});

export { productClicksJoiSchema };

export interface ProductClick extends Document {
    date: string;
    count: number;
}

export interface ProductClicks extends Document {
    banner_id: string;
    clicks: ProductClick[];
}

const productClickSchema = new Schema<ProductClick>({
    date: { type: String, required: true },
    count: { type: Number, required: true }
}, { _id: false });

const productClicksSchema = new Schema<ProductClicks>({
    banner_id: { type: String, required: true },
    clicks: [productClickSchema]
}, { versionKey: false });

const ProductClicksModel = mongoose.model<ProductClicks>('ProductClicks', productClicksSchema, 'dateforbanner');

export { ProductClicksModel };
