import { IsPositive } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { Wish } from "../../wishes/entities/wish.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers, { onDelete: 'CASCADE' })
  item: Wish;

  @Column({
    default: 0,
    type: 'decimal',
    scale: 2,
  })
  @IsPositive()
  amount: number;

  @Column({
    default: false
  })
  hidden: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;  
}
