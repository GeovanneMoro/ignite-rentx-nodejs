import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

@EntityRepository(Car)
class CarsRepository implements ICarsRepository {
  private respository: Repository<Car>;

  constructor() {
    this.respository = getRepository(Car);
  }

  async list(): Promise<Car[]> {
    const cars = await this.respository.find();

    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.respository.findOne({ license_plate });

    return car;
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.respository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });

    await this.respository.save(car);

    return car;
  }

  async findAvailableCars(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = this.respository
      .createQueryBuilder()
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }
    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }
    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.respository.findOne(car_id);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.respository.update(id, { available });
  }
}

export { CarsRepository };
