import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { Login } from '@app/authentication/login';
import { UserEntity } from '@app/database/models/user.entity';
import { LoginEntity } from '@app/database/models/login.entity';
import { LoginDto } from '@app/authentication/login/login.types';
import { UserDto } from '@app/authentication/user/user.types';
import jwtConfig from '@app/config/jwtConfig';

export class User {
  public static getUserRepository(): any {
    return getRepository(UserEntity);
  }

  public static async create(newUser: UserDto): Promise<UserEntity> {
    const user = await User.getUserRepository().save(newUser);
    if (newUser.password) {
      const loginData: LoginDto = {
        email: newUser.email,
        password: await bcrypt.hash(newUser.password, 8),
        user: { id: user.id }
      }
      Login.create(loginData);
    }
    return user;
  }

  public static findByEmail(email: string): Promise<UserEntity> {
    return User.getUserRepository().findOne({ email });
  }

  public static findById(id: number): Promise<UserEntity> {
    return User.getUserRepository().findOne(id);
  }

  public static findByExternalId(externalId: string): Promise<UserEntity> {
    return User.getUserRepository().findOne({ externalId });
  }
}
