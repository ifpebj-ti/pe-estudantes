import { Injectable } from '@nestjs/common';
import { HelloResponse } from './types';

@Injectable()
export class AppService {
  getHello(): HelloResponse {
    return { ping: 'pong' };
  }
}
