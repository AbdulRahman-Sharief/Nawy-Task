import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';

import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './DTOs/create-apartment.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentService: ApartmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new apartment' })
  @ApiResponse({ status: 201, description: 'Apartment created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  create(@Body() dto: CreateApartmentDto) {
    return this.apartmentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all apartments' })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll(@Query('search') search?: string) {
    return this.apartmentService.findAll(search);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get apartment by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 404, description: 'Apartment not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param('id') id: string) {
    return this.apartmentService.findOne(id);
  }
}
