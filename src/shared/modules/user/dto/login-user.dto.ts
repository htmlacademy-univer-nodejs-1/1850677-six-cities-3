import { IsEmail, IsString } from 'class-validator';
import { LoginUserMessages } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, { message: LoginUserMessages.email.invalidFormat })
  public email!: string;

  @IsString({ message: LoginUserMessages.password.invalidFormat })
  public password!: string;
}
