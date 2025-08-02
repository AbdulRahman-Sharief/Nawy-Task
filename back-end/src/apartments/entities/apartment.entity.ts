import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApartmentDocument = HydratedDocument<ApartmentEntity>;

@Schema({ timestamps: true })
export class ApartmentEntity {
  @Prop({ required: true })
  unitName: string;

  @Prop({ required: true })
  unitNumber: string;

  @Prop({ required: true })
  project: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  bedrooms: number;

  @Prop({ required: true })
  bathrooms: number;

  @Prop({ required: true })
  area: number;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const ApartmentSchema = SchemaFactory.createForClass(ApartmentEntity);

ApartmentSchema.index({
  unitName: 'text',
  unitNumber: 'text',
  project: 'text',
});
