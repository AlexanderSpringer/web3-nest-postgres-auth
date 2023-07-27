import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Request,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from 'src/users/dtos/users.dtos';
import { UsersService } from 'src/users/users.service';
    
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }
    
    @Get('id/:id')
    findUsersById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findUsersById(id);
    }
    
    @Post('create')
    @UsePipes(ValidationPipe)
    createUsers(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
    
    @Post('username')
    @UsePipes(ValidationPipe)
    updateUsername(@Request() req, @Body() data: Record<string, any>) {
        return this.userService.updateUsername(req.user.ethAddr, data.username);
    }

    @Get('profile')
    getProfile(@Request() req) {
      return this.userService.findUserByEthAddr(req.user.ethAddr);
    }
}