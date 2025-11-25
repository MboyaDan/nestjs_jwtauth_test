import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


// Define the PrismaModule that provides the PrismaService globally
@Global()

@Module({
  providers: [PrismaService],
    exports: [PrismaService],

})
export class PrismaModule {}
