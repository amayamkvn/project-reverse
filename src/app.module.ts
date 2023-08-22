import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Cargando el .env
    ConfigModule.forRoot({ isGlobal: true }),

    // Cargando la configuración de TypeORM del .env
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // Tipo de base de datos en este caso PostgreSQL
        type: 'postgres',
        // Base de datos
        database: config.get<string>('DB_NAME'),
        // Usuario de la base de datos
        username: config.get<string>('DB_USER'),
        // Contraseña de la base de datos
        password: config.get<string>('DB_PASSWORD'),
        // Host de la DB, normalmente VPN para DEV
        host: config.get<string>('DB_HOST'),
        // Puerto de la base de datos
        port: +config.get<string>('DB_PORT'),
        // Esquema de la base de datos
        schema: '',
       // Sincronizar las entidades con la base de datos
        // !En produccón debe permanecer en false
        synchronize: true,
        logging: true,
        autoLoadEntities: true
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
