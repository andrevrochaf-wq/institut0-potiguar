import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountabilityController } from './accountability.controller';
import { AccountabilityReport } from './accountability-report.entity';
import { AccountabilityService } from './accountability.service';
import { AccountabilityApsItem } from './accountability-aps-item.entity';
import { Aps } from '../aps/aps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountabilityReport, AccountabilityApsItem, Aps])],
  controllers: [AccountabilityController],
  providers: [AccountabilityService],
})
export class AccountabilityModule {}
