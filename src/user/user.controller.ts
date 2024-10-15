import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const users = await this.userService.findAll();
    return users.map(({ password, ...user }) => user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    const { password, ...userData } = user;
    return userData;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() user: User) {
    return await this.userService.create(user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() user: Partial<User>) {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    await this.userService.remove(id);
  }
}
