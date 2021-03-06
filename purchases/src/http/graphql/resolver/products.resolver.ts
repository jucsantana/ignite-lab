import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductService } from "src/services/product.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Product } from "../models/product";
import { CreateProductInput } from "../../inputs/create-product-input";

@Resolver(() => Product)
export class ProductsResolver{
    constructor(private productService: ProductService){}

    @Query(() => [Product])
    @UseGuards(AuthorizationGuard)
    products(){
        return this.productService.listAllProducts();
    }
    
    
    @UseGuards(AuthorizationGuard)
    @Mutation(() => Product)
    createProduct(@Args('data') data: CreateProductInput){
        return this.productService.createProduct(data);
    }

}