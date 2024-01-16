import { Injectable } from '@nestjs/common';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UsersRepository) {}

  signUp(authCredentailsDto: AuthCredentailsDto): Promise<void> {
    return this.userRepository.createUser(authCredentailsDto);
  }

  signIn(
    authCredentailsDto: AuthCredentailsDto,
  ): Promise<{ accessToken: string }> {
    return this.userRepository.signInUser(authCredentailsDto);
  }
}
