import { IsArray, IsString, IsUrl } from "class-validator";

export class CreateWishlistDto {
  @IsString()
  @IsUrl()
  image: string;

  @IsArray()
  itemsId: number[];

  @IsString()
  name: string;
}
