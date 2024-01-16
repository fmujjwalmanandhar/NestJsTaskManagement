import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bycrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createUser(authCredentailsDto: AuthCredentailsDto): Promise<void> {
    const { username, password } = authCredentailsDto;
    /***We'll hash the password and store it in db */
    const salt = await bycrypt.genSalt();
    const hassedPassword = await bycrypt.hash(password, salt);
    const user = this.usersRepository.create({
      username,
      password: hassedPassword,
    });
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`Username ${username} already exists.`);
      }
      throw new InternalServerErrorException();
    }
  }

  async signInUser(authCredentailsDto: AuthCredentailsDto): Promise<string> {
    const { username, password } = authCredentailsDto;
    const user = await this.usersRepository.findOneBy({ username });
    if (user && (await bycrypt.compare(password, user.password))) {
      return 'success';
    }
    throw new UnauthorizedException(
      'Please provide correct username or password!',
    );
  }
}
