import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  empty(){
    return "empty";
  }

  @Get(':data')
  getHello(@Param('data') data: string): string {
    if(data==undefined){
      data='hai';
    }
    try{
    this.appService.send('msg-sender',data);
    return data
    }
    catch(err){
      console.log("error")
      console.log(err)
      return err
    }
   
  }
}
