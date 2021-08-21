import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
  })
  @IsString()
  @MinLength(3, { message: '$property deve conter no mínimo 3 caracteres' })
  readonly name: string;

  @ApiProperty({
    description: 'E-mail do usuário para acesso a plataforma',
  })
  @IsEmail({}, { message: '$property é inválido' })
  readonly email: string;

  @ApiProperty({
    description: 'Senha do usuário para acesso a plataforma',
  })
  @IsString()
  @MinLength(8, { message: '$property deve conter no mínimo 8 caracteres' })
  readonly password: string;
}
