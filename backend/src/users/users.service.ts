import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(createUserDto: Partial<User>): Promise<User | null> {
    const user = await this.findOneByEmail(createUserDto.email);
    if (user) {
      throw (new NotFoundException().cause = HttpException.createBody({
        message: 'Usuário já cadastrado',
        statusCode: 409,
      }));
    }

    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: number, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw (new NotFoundException().cause = HttpException.createBody({
        message: 'Usuário não encontrado',
        statusCode: 404,
      }));
    }

    const updatedUser = { ...user, ...updateUserDto };
    await this.usersRepository.save(updatedUser);

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  truncate(): Promise<void> {
    return this.usersRepository.clear();
  }

  async removeMany(ids: number[]): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    let error = false;

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i < ids.length; i++) {
        await queryRunner.manager.delete(User, { id: ids[i] });
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      error = true;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    if(error) {
        throw (new NotFoundException().cause = HttpException.createBody({
            message: 'Não foi possível deletar os usuários',
            statusCode: 422,
          }));
    }
    return !error;
  }
}
