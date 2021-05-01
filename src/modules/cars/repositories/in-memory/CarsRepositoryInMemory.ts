import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async list(): Promise<Car[]> {
    const list = this.cars;

    return list;
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async findAvailableCars(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const availableCars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (category_id && car.category_id === category_id) ||
        (brand && car.brand === brand) ||
        (name && car.name === name)
      ) {
        return car;
      }

      return null;
    });

    return availableCars;
  }

  async findById(car_id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === car_id);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);

    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
