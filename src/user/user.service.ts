import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser() {
    return { name: 'Sarhak', email: 'trungafk0806@gmail.com' };
  }
}
