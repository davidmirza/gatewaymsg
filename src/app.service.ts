import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('r-m-q') private readonly client: ClientProxy, 
  ) {}
   
  public send(pattern: string, data: any) {
    console.log("data message kirim")
    return this.client.send(pattern, data).toPromise();
  }
}
