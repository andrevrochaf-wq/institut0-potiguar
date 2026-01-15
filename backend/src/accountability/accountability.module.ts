import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountabilityController } from './accountability.controller';
import { AccountabilityReport } from './accountability-report.entity';
import { AccountabilityService } from './accountability.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountabilityReport])],
  controllers: [AccountabilityController],
  providers: [AccountabilityService],
})
export class AccountabilityModule {}
