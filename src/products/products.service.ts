import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    sku: string,
    name: string,
    qty: number,
    description: string,
    images: string[],
  ) {
    const newProduct = new this.productModel({
      sku,
      name,
      qty,
      description,
      images,
    });

    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      sku: prod.sku,
      name: prod.name,
      qty: prod.qty,
      description: prod.description,
      images: prod.images,
    }));
  }

  async getProduct(id: string) {
    const product = await this.findProduct(id);

    return {
      id: product.id,
      sku: product.sku,
      name: product.name,
      qty: product.qty,
      description: product.description,
      images: product.images,
    };
  }

  private async findProduct(id: string): Promise<Product> {
    let product;

    try {
      product = await this.productModel.findById(id).exec();
    } catch (err) {
      throw new NotFoundException('Could not find product.');
    }

    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    return product;
  }
}
