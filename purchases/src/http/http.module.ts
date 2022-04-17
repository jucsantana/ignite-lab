import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module'
import  path  from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsResolver } from './graphql/resolver/products.resolver';
import { ProductService } from 'src/services/product.service';
import { PurchasesService } from 'src/services/purchases.service';
import { PurchasesResolver } from './graphql/resolver/purchases.resolver';
import { CustomerService } from 'src/services/customer.service';
import { CustomerResolver } from './graphql/resolver/customers.resolver';


@Module({
    imports: [
        ConfigModule.forRoot(), 
        DatabaseModule,
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
        })
    ],
    providers:[
        ProductsResolver, 
        ProductService,
        PurchasesResolver,
        PurchasesService,
        CustomerResolver,
        CustomerService,                
    ]
})
export class HttpModule {}
