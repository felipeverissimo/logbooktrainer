const request = require("supertest");
const app = require("../../index");
const UserModel = require("../../schema/UserModel"); // Substitua pelo caminho real do seu modelo

jest.mock("../../schema/UserModel"); // Substitua pelo caminho real do seu modelo

describe("Testando createUser", () => {
  it("Deve criar um usuário com sucesso", async () => {
    const newUser = {
      nome: "TestUser",
      password: "password123",
      email: "testuser@example.com",
    };

    UserModel.prototype.save.mockResolvedValueOnce(newUser);
    const response = await request(app).post("/user/save").send(newUser);

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Usuário criado com sucesso!");
    // Adicione mais expectativas conforme necessário
  });
});
