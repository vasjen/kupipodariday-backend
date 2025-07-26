import { Controller, Get, Post, Body, Param, Req, UseInterceptors, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { UserRequest } from '../users/types/user-request';
import { PasswordInterceptor } from '../auth/interceptors/password.interceptor';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('offers')
@UseGuards(JwtGuard)
@UseInterceptors(PasswordInterceptor)
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post('/')
  async create(@Req() req: UserRequest, @Body() createOfferDto: CreateOfferDto) {
    return await this.offersService.create(createOfferDto, req.user.id);
  }

  @Get('/')
  async getOffers(): Promise<Offer[]> {
    return this.offersService.findOffers();
  }

  @Get(':id')
  async getOfferById(@Param('id') id: number) {
    return this.offersService.findOfferById(id);
  }

}
