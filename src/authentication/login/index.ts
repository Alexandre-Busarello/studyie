import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserEntity } from '@app/database/models/user.entity';
import { LoginEntity } from '@app/database/models/login.entity';
import { LoginDto } from '@app/authentication/login/login.types';
import jwtConfig from '@app/config/jwtConfig';

interface JwtPayload {
  userId: string;
  name: string;
  email: string;
}

export class Login {
  public static getLoginRepository(): any {
    return getRepository(LoginEntity);
  }

  public static async create(newUser: LoginDto): Promise<LoginEntity> {
    const login = await Login.getLoginRepository().save(newUser);
    if (newUser.password) {
      newUser.password = await bcrypt.hash(newUser.password, 8);
    }
    return login;
  }

  public static findByEmail(email: string): Promise<LoginEntity> {
    return Login.getLoginRepository().findOne({ email });
  }

  public static generateToken(user: UserEntity): string {
    const payload: JwtPayload = {
      userId: user.externalId?.toString() || user.id?.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email
    };

    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
  }
}
