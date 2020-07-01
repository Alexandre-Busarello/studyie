import { UserEntity } from 'database/models/user.entity';
import { User } from 'authentication/user';
import { SignUpDto } from 'authentication/sign-up/sign-up.types';

export class SignUp {
  public static async isEmailExists(email: string): Promise<boolean> {
    const exists = await User.findByEmail(email);
    return !!exists;
  }

  public static getErrorOnData(data: SignUpDto): string {
    if (!data.email) {
      return 'Email is required'
    }
    if (!data.password) {
      return 'Password is required'
    }
    if (!data.firstName || !data.lastName) {
      return 'Name is required'
    }
    return null;
  }

  public static async createUser(data: SignUpDto): Promise<UserEntity> {
    const user = { ...data, isSocialLogin: false };
    const createdUser: UserEntity = await User.create(user);

    return createdUser;
  }
}
