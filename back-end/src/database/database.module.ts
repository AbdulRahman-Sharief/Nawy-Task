import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentSchema } from 'src/apartments/entities/apartment.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI as string, {
      dbName: process.env.DB_NAME,
    }),
    MongooseModule.forFeature([{ name: 'Apartment', schema: ApartmentSchema }]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
