import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './message/dto/create-message.dto';
import { Message } from './message/entities/message.entity';

@Injectable()
export class MessageService {
  
  message: Message[] = [];
  clientUSer={};
  create(createMessageDto: CreateMessageDto, clientid: string) {
    const message = {
      //email:this.clientUSer[clientid],
      email:createMessageDto.email,
      user:createMessageDto.user,
      content: createMessageDto.content,
    }
    this.message.push(message);
    
    return message;
  }
  join(name : string, clientid : string){
    console.log('join')
    this.clientUSer[clientid]=name;
    console.log(this.clientUSer)
    return Object.values(this.clientUSer);
  }
}
