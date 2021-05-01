import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userTokens = new UserTokens();

    Object.assign(userTokens, { user_id, expires_date, refresh_token });

    this.usersTokens.push(userTokens);

    return userTokens;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userTokens = this.usersTokens.find(
      (userToken) =>
        userToken.refresh_token === refresh_token &&
        userToken.user_id === user_id
    );

    return userTokens;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userTokens = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.usersTokens.splice(userToken);
  }
}

export { UsersTokensRepositoryInMemory };
