import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/index";

let connection: Connection;

describe("List Categories Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  it("should be able to list all categories", async () => {
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    // expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    // expect(response.body[0].name).toEqual("Category Supertest");
  });
});
