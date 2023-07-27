import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dtos/users.dtos';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}
  
    createUser(createUserDto: CreateUserDto) {
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    updateUser(id: number, updateUserDto: CreateUserDto) {
        return this.userRepository.update(id, updateUserDto);
    }

    updateUsername(ethAddr: string, username: string) {
        return this.userRepository.update({ethAddr: ethAddr}, {username: username});
    }
          
    findUsersById(id: number) {
        return this.userRepository.findOneBy({id: id});
    }
          
    findUsersByUsername(username: string) {
        return this.userRepository.findOneBy({username: username});
    }

    findUserByEthAddr(ethAddr: string) {
        return this.userRepository.findOneBy({ethAddr: ethAddr});
    }

    getUsers() {
        return this.userRepository.find();
    }
}