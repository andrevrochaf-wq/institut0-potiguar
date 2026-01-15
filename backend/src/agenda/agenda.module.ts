import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaEntry } from './agenda-entry.entity';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';

@Module({
  imports: [TypeOrmModule.forFeature([AgendaEntry])],
  controllers: [AgendaController],
  providers: [AgendaService],
})
export class AgendaModule {}
