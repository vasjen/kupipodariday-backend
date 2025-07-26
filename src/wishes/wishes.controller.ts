import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserRequest } from '../users/types/user-request';
import { Wish } from './entities/wish.entity';
import { WishesService } from './wishes.service';
import { PasswordInterceptor } from '../auth/interceptors/password.interceptor';
import { OfferInterceptor } from '../auth/interceptors/offer.interceptor';

@Controller('wishes')
@UseInterceptors(PasswordInterceptor)
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post('/')
  @UseGuards(JwtGuard)
  async create(@Req() req: UserRequest, @Body() createWishDto: CreateWishDto): Promise<Wish> {
    return await this.wishesService.create(createWishDto, req.user);
  }

  @Get('last')
  async getLastWishes(): Promise<Wish[]> {
    return await this.wishesService.getLastWishes();
  }

  @Get('top')
  async getTopWishes(): Promise<Wish[]> {
    return await this.wishesService.getTopWishes();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @UseInterceptors(OfferInterceptor)
  async getWishById(@Param('id') id: number): Promise<Wish> {
    return await this.wishesService.findWishById(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async updateWishById(@Req() req: UserRequest, @Param('id') id: number, @Body() updateWishDto: UpdateWishDto): Promise<Wish> {
    return await this.wishesService.updateWish(
      id,
      updateWishDto,
      req.user,
    );
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteWishById(@Req() req: UserRequest, @Param('id') id: number): Promise<Wish> {
    return await this.wishesService.removeWish(id, req.user);
  }

  @Post(':id/copy')
  @UseGuards(JwtGuard)
  async copyWishById(@Req() req: UserRequest, @Param('id') id: number): Promise<Wish> {
    return await this.wishesService.copyWish(id, req.user);
  }
 
}
