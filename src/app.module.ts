import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'r-m-q',
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://cuvywbps:i8Yy1x8CE1iETE0twLgd1xVFLSvNCgUd@mustang.rmq.cloudamqp.com/cuvywbps',
        ],
        queue: 'msg-app',
      },
    },
  ]),],
  controllers: [AppController], 
  providers: [AppService,MessageGateway,MessageService]
})
export class AppModule {}
