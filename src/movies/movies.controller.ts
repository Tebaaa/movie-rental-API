import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt/jwt-auth.guard';
import { ActionDto } from './dto/action.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { MoviesService } from './services/movies.service';
import { RentalServices } from './services/rental-services.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private moviesService: MoviesService,
    private rentalService: RentalServices,
  ) {}

  @Get()
  getAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.moviesService.findById(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Body() updateMovieDto: UpdateMovieDto, @Param('id') id: number) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return this.moviesService.delete(id);
  }

  @UseGuards(JwtAuthGuard, ClientGuard)
  @Post(':id')
  rentalAction(@Param('id') id: number, @Body() actionDto: ActionDto) {
    const actionIsBuy = actionDto.action === 'buy';
    const actionIsRent = actionDto.action === 'rent';
    const actionIsReturn = actionDto.action === 'return';

    switch (true) {
      case actionIsBuy:
        return this.rentalService.buy(id);
      case actionIsRent:
        return this.rentalService.rent(id);
      case actionIsReturn:
        return this.rentalService.return(id);
      default:
        throw new BadRequestException('Value must be buy, rent or return');
    }
  }
}
