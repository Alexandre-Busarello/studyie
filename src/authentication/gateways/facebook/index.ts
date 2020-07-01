import axios from 'axios';
import { FacebookConstants } from '@app/authentication/gateways/facebook/constants';
import { HttpMethod } from '@app/common/enum/httpMethod.enum';
import { UserEntity } from '@app/database/models/user.entity';
import { UserDto } from '@app/authentication/user/user.types';

export class FacebookGateway {
  public static async getUserProfile(accessToken: string): Promise<UserDto> {
    const profileUrl = 'https://graph.facebook.com/me';
    const requiredFields = FacebookConstants.USER_FIELDS.join(',');

    const url = `${profileUrl}?fields=${requiredFields}&access_token=${accessToken}`;
    const response = await FacebookGateway.makeRequest(url);

    if (!response?.id) {
      throw new Error('Não foi possível obter as informações de perfil');
    }

    const user: UserDto = {
      externalId: response.id,
      email: response.email,
      firstName: response.first_name,
      lastName: response.last_name,
      pictureUrl: response.picture.data.url,
      isSocialLogin: true,
    };

    return user;
  }

  private static async makeRequest(
    url: string,
    method: HttpMethod = HttpMethod.GET,
    body?: any,
  ): Promise<any> {
    const { data } = await axios.request({ url, method, data: body });
    return data;
  }
}
