import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { get } from 'http';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }
}
