import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name",
      description: "Car_description",
      daily_rate: 100,
      license_plate: "ABC-2121",
      fine_amount: 60,
      brand: "Car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be albe to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name_1",
      description: "Car_description",
      daily_rate: 100,
      license_plate: "ABC-2121",
      fine_amount: 60,
      brand: "Car_brand",
      category_id: "category_id_1",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id_1",
    });

    expect(cars).toEqual([car]);
  });

  it("should be albe to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name_1",
      description: "Car_description",
      daily_rate: 100,
      license_plate: "ABC-2121",
      fine_amount: 60,
      brand: "Car_brand_1",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_name_1",
    });

    expect(cars).toEqual([car]);
  });

  it("should be albe to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name_1",
      description: "Car_description",
      daily_rate: 100,
      license_plate: "ABC-2121",
      fine_amount: 60,
      brand: "Car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car_name_1" });

    expect(cars).toEqual([car]);
  });
});
