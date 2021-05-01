import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

      const allCategories = await listCategoriesUseCase.execute();

      return response.json(allCategories);
    } catch (err) {
      return response.status(403).json({ error: err.message });
    }
  }
}

export { ListCategoriesController };
