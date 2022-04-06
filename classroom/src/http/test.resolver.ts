import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "./auth/authorization.guard";

@Resolver('test')
export class TestResolver{


    @Query(() => String)
    @UseGuards(AuthorizationGuard)
    hello(){
        return 'hello world';
    }

}