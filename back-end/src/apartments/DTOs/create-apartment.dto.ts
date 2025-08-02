import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  @IsNotEmpty()
  unitName: string;

  @IsString()
  @IsNotEmpty()
  unitNumber: string;

  @IsString()
  @IsNotEmpty()
  project: string;

  @IsNumber()
  price: number;

  @IsNumber()
  bedrooms: number;

  @IsNumber()
  bathrooms: number;

  @IsNumber()
  area: number;

  @IsString()
  description: string;

  @IsArray()
  images: string[];
}
