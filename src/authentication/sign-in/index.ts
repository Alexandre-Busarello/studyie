import bcrypt from 'bcryptjs';
import { UserEntity } from 'database/models/user.entity';
import { LoginEntity } from 'database/models/login.entity';
import { FacebookGateway } from 'authentication/gateways/facebook';
import { User } from 'authentication/user';
import { Login } from 'authentication/login';
import { UserDto } from 'authentication/user/user.types';
import { LoginDto } from 'authentication/login/login.types';
import { LoginSuccessDto } from 'authentication/login/login.types';

interface AuthenticatedUser {
  user: User;
  token: string;
}

export class SignIn {
  public static async login(email: string, password: string): Promise<LoginSuccessDto> {
    const loginData: LoginEntity = await Login.findByEmail(email);
    if (await bcrypt.compare(password, loginData.password)) {
      const user: UserEntity = await User.findByEmail(email);
      return {
        user,
        token: Login.generateToken(user),
      };
    }
    return null;
  }

  public static async signInWithFacebook(accessToken: string): Promise<AuthenticatedUser> {
    const user: UserDto = await FacebookGateway.getUserProfile(accessToken);

    const createdUser: UserEntity = await User.create(user);

    return {
      user: createdUser,
      token: Login.generateToken(createdUser),
    };
  }

  public static async signInWithGoogle(googleUser: UserDto): Promise<AuthenticatedUser> {
    googleUser.isSocialLogin = true;
    const createdUser: UserEntity = await User.create(googleUser);

    return {
      user: createdUser,
      token: Login.generateToken(createdUser),
    };
  }

  public static getErrorOnData(data: LoginDto): string {
    if (!data.email) {
      return 'Email is required'
    }
    if (!data.password) {
      return 'Password is required'
    }
    return null;
  }
}
