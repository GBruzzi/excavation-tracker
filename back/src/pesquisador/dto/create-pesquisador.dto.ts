import { IsOptional, IsString, Length } from 'class-validator';

export class CreatePesquisadorDto {
  @IsString()
  @Length(1, 255)
  nome: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  contato?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  instituicao?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  especialidade?: string;
}
