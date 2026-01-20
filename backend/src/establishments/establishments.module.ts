import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from './establishment.entity';
import { EstablishmentClass } from './establishment-class.entity';
import { EstablishmentStage } from './establishment-stage.entity';
import { EstablishmentsController } from './establishments.controller';
import { EstablishmentsService } from './establishments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Establishment, EstablishmentStage, EstablishmentClass])],
  controllers: [EstablishmentsController],
  providers: [EstablishmentsService],
})
export class EstablishmentsModule {}
