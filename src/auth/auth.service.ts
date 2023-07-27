import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/users.dtos';
import { ethers } from 'ethers';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findUsersByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signInWithMetamask(response, ethAddr, signature) {
    if (!ethAddr || !signature) throw new UnauthorizedException("Missing ethAddr or signature!");

    // Find user by ethAddr
    const user = await this.usersService.findUserByEthAddr(ethAddr);
    if (!user) { throw new UnauthorizedException(); }
    
    // Verfy signature with ethers.js
    const recoveredAddress = ethers.verifyMessage(user.nonce.toString(), signature);
    if (recoveredAddress !== ethAddr) { throw new UnauthorizedException(); }

    const payload = { ethAddr: ethAddr, nonce: user.nonce };

    // Set nonce to 0
    await this.usersService.updateUser(user.id, {
      ...user,
      nonce: 0
    });

    const jwtToken = await this.jwtService.signAsync(payload);
    response.cookie('jwt', jwtToken, { path: '/', samesite:'lax' });

    return {
      access_token: jwtToken,
    };
  }

  async getNonce(ethAddr) {
    if (!ethAddr) throw new UnauthorizedException();

    let user = await this.usersService.findUserByEthAddr(ethAddr);
    const nonce = Math.floor(Math.random() * 1000000000);

    if (!user) 
    {
      // Create user
      user = await this.usersService.createUser({
        ethAddr: ethAddr, 
        nonce: nonce,
        email: "",
        username: "",
        password: ""
      });
    }
    else
    {
      // Update user
      this.usersService.updateUser(user.id, {
        ...user,
        nonce: nonce
      });
    }

    console.log({nonce: nonce});
    user = await this.usersService.findUserByEthAddr(ethAddr);

    return {
      nonce: nonce
    }
  }
}