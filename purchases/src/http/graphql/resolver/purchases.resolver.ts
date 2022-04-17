import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthUser, CurrentUser } from "src/http/auth/current-user";
import { CreatePurchaseInput } from "src/http/inputs/create-purchase-input";
import { CustomerService } from "src/services/customer.service";
import { ProductService } from "src/services/product.service";
import { PurchasesService } from "src/services/purchases.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Product } from "../models/product";
import { Purchase } from "../models/purchases";


@Resolver(() => Purchase)
export class PurchasesResolver{
    constructor(
                private purchasesService: PurchasesService,
                private productService: ProductService,
                private customerService: CustomerService
                ){}

    @Query(() => [Purchase])
    @UseGuards(AuthorizationGuard)
    purchases(){
        return this.purchasesService.listAllPurchases();
    }


    @ResolveField(() => Product)
    @UseGuards(AuthorizationGuard)
    product(@Parent() purchase:Purchase){
      return this.productService.findProductById(purchase.productId);
    }

    @UseGuards(AuthorizationGuard)
    @Mutation(() => Purchase)
    async createPurchase(
      @Args('data') data: CreatePurchaseInput,
      @CurrentUser() user:AuthUser){
        let customer = await this.customerService
                                .getCustomerByAuthUserId(user.sub);
        if(!customer){
          customer = await this.customerService
                               .createCustomer({
                                 authUserId: user.sub
                                });
        }
        return this.purchasesService.createPurchase({
            productId: data.productId,
            customerId: customer.id
        });
    }

}