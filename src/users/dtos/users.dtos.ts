import { IsEmail, IsEthereumAddress, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEthereumAddress()
  ethAddr: string;

  @IsOptional()
  @MinLength(3)
  username: string;

  @IsOptional()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  nonce: number;
}