import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    Res,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('metamask')
    signInWithMetamask(@Res({ passthrough: true }) response: Response,
                       @Body() signInDto: Record<string, any>) {
      return this.authService.signInWithMetamask(response, signInDto.eth_addr, signInDto.signature);
    }

    @HttpCode(HttpStatus.OK)
    @Post('nonce')
    getNonce(@Body() body: Record<string, any>) {
      return this.authService.getNonce(body.eth_addr);
    }
  }