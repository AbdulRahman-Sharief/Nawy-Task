import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ApartmentDocument = HydratedDocument<ApartmentEntity>;

@Schema({ timestamps: true })
export class ApartmentEntity {
  @ApiProperty({ description: 'Name of the apartment unit' })
  @Prop({ required: true })
  unitName: string;
  @ApiProperty({ description: 'Unit number identifier' })
  @Prop({ required: true })
  unitNumber: string;
  @ApiProperty({ description: 'Project or development name' })
  @Prop({ required: true })
  project: string;
  @ApiProperty({ description: 'Price in USD', example: 150000 })
  @Prop({ type: Number, required: true })
  price: number;
  @ApiProperty({ description: 'Number of bedrooms', example: 3 })
  @Prop({ required: true })
  bedrooms: number;
  @ApiProperty({ description: 'Number of bathrooms', example: 2 })
  @Prop({ required: true })
  bathrooms: number;
  @ApiProperty({ description: 'Area in square feet', example: 1200 })
  @Prop({ required: true })
  area: number;
  @ApiProperty({ description: 'Detailed description of the apartment' })
  @Prop({ required: true })
  description: string;
  @ApiProperty({
    description: 'Array of image URLs',
    type: [String],
  })
  @Prop({ type: [String], default: [] })
  images: string[];
}

export const ApartmentSchema = SchemaFactory.createForClass(ApartmentEntity);

ApartmentSchema.index({
  unitName: 'text',
  unitNumber: 'text',
  project: 'text',
});
