import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: '192.168.2.165',
    //   port: 8086,
    //   ttl:0
    //   // password: 'red_G$$fbi!oo' || 'red_G$$fbi!oo',
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
