import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";


interface CustomerCreateParams{
    authUserId: string;
}

@Injectable()
export class CustomerService{
    constructor(private prisma: PrismaService){}
    
    
    createCustomer( { authUserId }: CustomerCreateParams){
        return this.prisma.customer.create({
            data: {
                authUserId
            }
        });
    }
         
    getCustomerByAuthUserId(authUserId: string){
        return this.prisma.customer.findUnique({
            where:{
                authUserId,
            }
        });
    }   

}