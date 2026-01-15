import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aps } from './aps.entity';
import { ApsController } from './aps.controller';
import { ApsService } from './aps.service';

@Module({
  imports: [TypeOrmModule.forFeature([Aps])],
  controllers: [ApsController],
  providers: [ApsService],
})
export class ApsModule {}
