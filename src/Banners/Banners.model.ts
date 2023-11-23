import Joi from 'joi';
import mongoose, { Document, Schema } from 'mongoose';
import { Banner } from '../interface';

const bannerSchema = new Schema<Banner>({
    id: { type: Number, required: true },
    image: {
        url: { type: String, required: true },
        alt: { type: String, required: true }
    },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    author: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    sale: { type: Number, required: false }
}, { versionKey: false });

const BannerModel = mongoose.model<Banner>('banner', bannerSchema, 'banners');

const bannerJoiSchema = Joi.object({
    id: Joi.number(),
    image: Joi.object({
        url: Joi.string().required(),
        alt: Joi.string().required()
    }).required(),
    text: Joi.string().required(),
    createdAt: Joi.date().default(() => new Date()),
    author: Joi.string().required(),
    category: Joi.string().required(),
    rating: Joi.number().required(),
    sale: Joi.number(),
    productID: Joi.string().required(),
});

export { BannerModel, bannerJoiSchema };
