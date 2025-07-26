import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UseGuards } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { UserRequest } from '../users/types/user-request';
import { Wishlist } from './entities/wishlist.entity';
import { PasswordInterceptor } from '../auth/interceptors/password.interceptor';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('wishlistlists')
@UseGuards(JwtGuard)
@UseInterceptors(PasswordInterceptor)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get('/')
  async getWishlists(): Promise<Wishlist[]> {
    return await this.wishlistsService.findWishlists();
  }
  
  @Post('/')
  async create(@Req() req: UserRequest, @Body() createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    return this.wishlistsService.create(createWishlistDto, req.user);
  }
  
  @Get(':id')
  async getWishlistById(@Param('id') id: number): Promise<Wishlist> {
    return await this.wishlistsService.findById(id);
  }
  
  @Patch(':id')
  async updateWishlistById(@Req() req: UserRequest, @Param('id') id: number, @Body() updateWishlistDto: UpdateWishlistDto): Promise<Wishlist> {
    return await this.wishlistsService.updateOne(
      id,
      updateWishlistDto,
      req.user,
    );
  }

  @Delete(':id')
  async deleteWishlistById(@Req() req: UserRequest, @Param('id') id: number): Promise<Wishlist> {
    return await this.wishlistsService.removeOne(id, req.user);
  }
  
}
