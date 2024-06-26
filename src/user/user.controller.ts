import { Body, Controller, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User, roles } from './user.entity';
import { Roles } from 'src/decorator/role.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(roles.admin)
  updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.userService.updateUser(id, updateData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(roles.admin)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

}
