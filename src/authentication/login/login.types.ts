import { UserEntity } from 'database/models/user.entity';
import { UserRelationType } from 'authentication/user/user.types';

export interface LoginDto {
  email: string;
  password: string;
  user: UserRelationType;
}

export interface LoginSuccessDto {
  user: UserEntity;
  token: string;
}
