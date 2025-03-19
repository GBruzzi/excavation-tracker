import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreatePontoDto {
  @IsString()
  tipoPonto: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsNumber()
  altitude?: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsDateString()
  dataDescoberta?: Date;

  @IsNumber()
  pesquisadorId: number;

}
