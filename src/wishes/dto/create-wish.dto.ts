import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateWishDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
