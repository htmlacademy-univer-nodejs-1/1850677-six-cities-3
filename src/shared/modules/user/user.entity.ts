import { createSHA256 } from '../../helpers/hash.js';
import { User, UserType } from '../../types/index.js';
import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true
  })
  public name: string;

  @prop({
    unique: true,
    required: true
  })
  public email: string;

  @prop({
    required: false,
    default: 'avatar-max.jpg',
  })
  public avatar?: string;

  @prop({
    required: false,
    enum: UserType
  })
  public type: UserType;

  @prop({
    required: true,
    ref: 'OfferEntity',
    default: []
  })
  public favoriteOffers!: Ref<OfferEntity>[];

  @prop({
    required: true,
  })
  private password?: string;

  constructor(userData: User) {
    super();
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
