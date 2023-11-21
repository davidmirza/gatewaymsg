import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './message/dto/create-message.dto';
import {Server,Socket} from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import {AppService }  from 'src/app.service';

@WebSocketGateway()
export class MessageGateway implements OnModuleInit{
  @WebSocketServer()
  server:Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly appser: AppService
    ) {}
  onModuleInit() {
    this.server.on('connection', (socket)=>{
      console.log(socket.id+" connected");
  });
  }

  @SubscribeMessage('SendMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto,@ConnectedSocket() client: Socket) {
    const message = await this.messageService.create(createMessageDto, client.id);
    console.log(message)
    const msg = await this.server.emit('message', message);
    if(msg){
      this.appser.send('msg-sender',message);
    }
    return message;
  }
  
  @SubscribeMessage('join')
  joinroom(@MessageBody('name') name: string, @ConnectedSocket() client: Socket){
    return this.messageService.join(name, client.id);
  }
   
}
