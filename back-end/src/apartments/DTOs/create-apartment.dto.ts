import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateApartmentDto {
  @ApiProperty({ description: 'Name of the apartment unit' })
  @IsString()
  @IsNotEmpty()
  unitName: string;

  @ApiProperty({ description: 'Unit number identifier' })
  @IsString()
  @IsNotEmpty()
  unitNumber: string;

  @ApiProperty({ description: 'Project or development name' })
  @IsString()
  @IsNotEmpty()
  project: string;

  @ApiProperty({ description: 'Price in USD' })
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  bedrooms: number;

  @ApiProperty()
  @IsNumber()
  bathrooms: number;

  @ApiProperty({ description: 'Area in square feet' })
  @IsNumber()
  area: number;

  @ApiProperty({ description: 'Detailed description of the apartment' })
  @IsString()
  description: string;

  @ApiProperty({ type: [String], description: 'Array of image URLs' })
  @IsArray()
  images: string[];
}
