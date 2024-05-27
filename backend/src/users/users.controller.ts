import { Body, Controller, Delete, Get, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserValidatorPipe } from '../validations/users/user.validation.pipe';
import { CreateUserReqDto, CreateUserReqSchema } from 'src/validations/users/create-user-req-dto-and-schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private authService: AuthService) {}

    @UseGuards(AuthGuard)
    @Get('list')
    findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }

    @Post()
    @UsePipes(new CreateUserValidatorPipe<CreateUserReqDto>(CreateUserReqSchema))
    async create(@Body() createUserDto: CreateUserReqDto): Promise<any> {
      const user = await this.usersService.create(createUserDto);
      const jwtToken = await this.authService.generateToken(user);
      return {...jwtToken, user};
    }
    
    @UseGuards(AuthGuard)
    @Put()
    async update(@Body() updateUserDto: Record<string, any>): Promise<any> {
      const user = await this.usersService.updateUser(updateUserDto.id, updateUserDto);
      return { user };
    }

    @UseGuards(AuthGuard)
    @Delete()
    async delete(@Body() id: number): Promise<void> {
      await this.usersService.remove(id);
    }

    @UseGuards(AuthGuard)
    @Delete('/delete-many')
    async deleteMany(@Body() ids: number[]): Promise<void> {
      await this.usersService.removeMany(ids);
    }
}
