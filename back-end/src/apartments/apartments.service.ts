import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ApartmentEntity,
  ApartmentDocument,
} from './entities/apartment.entity';
import { CreateApartmentDto } from './DTOs/create-apartment.dto';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectModel('Apartment')
    private readonly apartmentModel: Model<ApartmentDocument>,
  ) {}

  async create(createDto: CreateApartmentDto) {
    const created = new this.apartmentModel(createDto);
    return created.save();
  }

  async findAll() {
    return this.apartmentModel.find().exec();
  }

  async findOne(id: string) {
    const apartment = await this.apartmentModel.findById(id);
    if (!apartment) throw new NotFoundException('Apartment not found');
    return apartment;
  }
}
