import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(@InjectRepository(Token) private readonly tokenRepository: Repository<Token>) {}

  async create(createTokenDto: CreateTokenDto, user: User): Promise<Token> {
    return this.tokenRepository.save({ ...createTokenDto, user });
  }

  async removeByUser(refreshToken: string, user: User): Promise<Token> {
    const token = await this.tokenRepository.findOne({ token: refreshToken, user });
    return this.tokenRepository.remove(token);
  }

  findAll() {
    return `This action returns all token`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
