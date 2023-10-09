import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('sku') sku: string,
    @Body('name') name: string,
    @Body('qty') qty: number,
    @Body('description') description: string,
    @Body('images') images: string[],
  ) {
    const generatedId = await this.productService.insertProduct(
      sku,
      name,
      qty,
      description,
      images,
    );

    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productService.getProducts();
    return products;
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }
}
