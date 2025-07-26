import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { WishesService } from 'src/wishes/wishes.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    private wishesService: WishesService,
    private usersService: UsersService,
  ) {}

  async create(createOfferDto: CreateOfferDto, userId: number): Promise<Offer> {
    const { amount, itemId } = createOfferDto;

    const user = await this.usersService.findOne({
      relations: ['wishes', 'offers', 'wishlists'],
      where: { id: userId },
    });

    const wish = await this.wishesService.findOne({
      relations: ['owner', 'offers'],
      where: { id: itemId },
    });

    const totalRaisedSum = wish.raised + amount;

    if (user.id === wish.owner.id) {
      throw new BadRequestException(
        'Нельзя вносить деньги на собственные подарки',
      );
    }

    if (wish.raised === wish.price) {
      throw new BadRequestException('На этот подарок уже собраны деньги');
    }

    if (totalRaisedSum > wish.price) {
      throw new BadRequestException(
        'Сумма собранных средств не может превышать стоимость подарка',
      );
    }

    await this.wishesService.updateOne(itemId, {
      raised: totalRaisedSum,
    });

    return await this.offersRepository.save({
      ...createOfferDto,
      item: wish,
      user,
    });
  }

  async findOffers(): Promise<Offer[]> {
    return await this.offersRepository.find({
      relations: ['user', 'item'],
    });
  }

  async findOfferById(id: number): Promise<Offer> {
    return await this.findOne({ relations: ['user', 'item'], where: { id } });
  }

  async findOne(options: FindOneOptions<Offer>): Promise<Offer> {
    const offer = await this.offersRepository.findOne(options);

    if (!offer) {
      throw new NotFoundException();
    }

    return offer;
  }

}
