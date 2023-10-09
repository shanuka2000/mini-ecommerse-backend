import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
});

export interface Product extends mongoose.Document {
  id: string;
  sku: string;
  name: string;
  qty: number;
  description: string;
  images: string[];
}
