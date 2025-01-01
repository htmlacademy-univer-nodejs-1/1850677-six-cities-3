import { Expose } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { AccommodationType } from '../../../types/accommodation-type.enum.js';

export class FavoriteOfferDto {
  @Expose()
  public id!: string;

  @Expose()
    title!: string;

  @Expose()
    description!: string;

  @Expose({ name: 'createdAt' })
    createdDate!: Date;

  @Expose()
    city!: City;

  @Expose()
    previewImage!: string;

  @Expose()
    isPremium!: boolean;

  isFavourites = true;

  @Expose()
    rating!: number;

  @Expose()
    type!: AccommodationType;

  @Expose()
    price!: number;

  @Expose()
    commentCount!: number;
}
