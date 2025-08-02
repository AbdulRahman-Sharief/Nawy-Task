import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';

import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './DTOs/create-apartment.dto';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly service: ApartmentsService) {}

  @Post()
  create(@Body() dto: CreateApartmentDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
