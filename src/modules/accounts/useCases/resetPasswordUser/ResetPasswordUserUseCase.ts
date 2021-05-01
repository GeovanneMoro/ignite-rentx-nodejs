import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider") private dateProvider: IDateProvider,
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    // verificar se token é válido
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );
    if (!userToken) {
      throw new AppError("Token invalid!");
    }

    // verificar se token está expirado
    const date = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow()
    );
    if (date) {
      throw new AppError("Token expired!");
    }

    // alterar senha
    const user = await this.usersRepository.findById(userToken.user_id);
    const passwordHashed = await hash(password, 8);

    user.password = passwordHashed;

    await this.usersRepository.create(user);
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
