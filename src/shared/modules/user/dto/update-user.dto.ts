import { IsOptional } from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  public email?: string;

  @IsOptional()
  public name?: string;

  @IsOptional()
  public avatarPath?: string;
}
