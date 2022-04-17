import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Customer } from "../models/customer";
import { CustomerService } from "src/services/customer.service";
import { AuthUser, CurrentUser } from "src/http/auth/current-user";
import { PurchasesService } from "src/services/purchases.service";

@Resolver(() => Customer)
export class CustomerResolver{
    constructor(
        private customerService: CustomerService,
        private purchasesService: PurchasesService
    ){}
  
    @UseGuards(AuthorizationGuard)
    @Query(() => Customer)
    me(
        @CurrentUser() user: AuthUser
    ){
        return this.customerService.getCustomerByAuthUserId(user.sub)
    }

    @ResolveField()
    @UseGuards(AuthorizationGuard)
    purchases(@Parent() customer: Customer){
      return this.purchasesService.listAllFromCustomer(customer.id);
    }

}