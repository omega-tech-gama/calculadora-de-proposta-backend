import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsDateString,
  ValidateNested,
  Validate,
  ArrayNotEmpty,
  IsPositive,
  IsEnum,
  IsBoolean,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
  
import { ApiProperty } from '@nestjs/swagger';

@ValidatorConstraint({ name: 'isGreaterThan', async: false })
class DataFimConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return value > args.object[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments) {
    return '$property deve ser maior que $constraint1';
  }
}

export enum FonteEnergia {
  CONVENCIONAL = 'CONVENCIONAL',
  RENOVAVEL = 'RENOVAVEL',
}

export enum Submercado {
  NORTE = 'NORTE',
  NORDESTE = 'NORDESTE',
  SUL = 'SUL',
  SUDESTE = 'SUDESTE',
}

class Loads {
  @ApiProperty({
    description: 'Nome da empresa que irá consumir a carga de energia',
  })
  @IsString({ message: '$property deve ser uma string' })
  @IsNotEmpty({ message: '$property não pode ser vazio' })
  nome_empresa: string;

  @ApiProperty({
    description: 'Qauntidade em kWh que a empresa irá consumir',
  })
  @IsPositive({ message: '$property deve ser um número positivo' })
  @IsInt({ message: '$property deve ser um número inteiro' })
  @IsNotEmpty({ message: '$property não pode ser vazio' })
  consumo_kwh: number;
}

export class CreateProposalDto {
  @ApiProperty({
    description: 'Data de início do contrato',
  })
  @IsDateString(null, { message: '$property deve ser uma data ISO 8601 válida' })
  @IsNotEmpty({ message: '$property não pode ser vazio' })
  data_inicio: string;

  @ApiProperty({
    description: 'Data de termino do contrato',
  })
  @Validate(DataFimConstraint, ['data_inicio'])
  @IsDateString(null, { message: '$property deve ser uma data ISO 8601 válida' })
  @IsNotEmpty({ message: '$property não pode ser vazio' })
  data_fim: string;

  @ApiProperty({
    description: 'Cargas de energia',
    type: [Loads]
  })
  @ValidateNested()
  @ArrayNotEmpty({ message: '$property não pode ser vazio' })
  @Type(() => Loads)
  cargas: Loads[];

  @ApiProperty({
    description: 'Fonte de energia',
    enum: FonteEnergia
  })
  @IsEnum(FonteEnergia, { message: '$property deve ser um enum válido (CONVENCIONAL | RENOVAVEL) ' })
  fonte_energia: string;

  @ApiProperty({
    description: 'Região em que será a fonte de energia',
    enum: Submercado
  })
  @IsEnum(Submercado, { message: '$property deve ser um enum válido (NORTE | NORDESTE | SUL | SUDESTE)' })
  submercado: string;

  @ApiProperty({
    description: 'Campo que diz se a proposta está ou não contratada',
    default: false,
    required: false
  })
  @IsBoolean({ message: '$property deve ser um boolean' })
  contratado: boolean = false;

  consumo_total: number;

  valor_proposta: number;
}
