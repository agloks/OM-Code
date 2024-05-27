import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';

const dbConfig = require('../ormconfig.json');

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
