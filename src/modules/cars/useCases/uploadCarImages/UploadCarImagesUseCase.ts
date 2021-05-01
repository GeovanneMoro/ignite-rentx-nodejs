import { inject, injectable } from "tsyringe";

import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("CarsImagesRepository")
    private carsImagesRepository: CarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError("Car does not exists!");
    }

    if (images_name.length < 1) {
      throw new AppError("Must have at least one photo!", 303);
    }

    images_name.map(async (image) => {
      await this.carsImagesRepository.create({ car_id, image_name: image });
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
