import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  image: string;
}
