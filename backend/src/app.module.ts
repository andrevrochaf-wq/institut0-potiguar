import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { EstablishmentsModule } from './establishments/establishments.module';
import { ContractsModule } from './contracts/contracts.module';
import { AccountabilityModule } from './accountability/accountability.module';
import { ApsModule } from './aps/aps.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ServicesModule } from './services/services.module';
import { ProjectsModule } from './projects/projects.module';
import { ProvidersModule } from './providers/providers.module';
import { AgendaModule } from './agenda/agenda.module';
import { CitiesModule } from './cities/cities.module';
import { NewsModule } from './news/news.module';
import { FinanceModule } from './finance/finance.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false,
        logging: ['error', 'warn'],
      }),
    }),
    UsersModule,
    AuthModule,
    CollaboratorsModule,
    EstablishmentsModule,
    ContractsModule,
    AccountabilityModule,
    ApsModule,
    DashboardModule,
    ServicesModule,
    ProjectsModule,
    ProvidersModule,
    AgendaModule,
    CitiesModule,
    NewsModule,
    FinanceModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
