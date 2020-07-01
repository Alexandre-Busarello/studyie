export interface UserDto {
  id?: number | string;
  externalId?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  isSocialLogin: boolean;
  pictureUrl?: string;
}

export interface UserRelationType {
  id: number,
}
