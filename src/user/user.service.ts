import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async get(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async create(payload: CreateUserDto) {
    const user = await this.getByEmail(payload.email);
    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created',
      );
    }
    return await this.userRepository.save(payload);
  }
}
