import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class OfferInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.hideOfferAmount(data)));
  }
  private hideOfferAmount(wish: Wish): Wish {
    {
      if (wish instanceof Object && wish.offers) {
        for (const offer of wish.offers) {
          if (offer.hidden) {
            delete offer.amount;
          }
        }
      }
      return wish;
    }
  }
} 