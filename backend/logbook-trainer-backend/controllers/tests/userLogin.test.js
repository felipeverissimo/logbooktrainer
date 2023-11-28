const request = require("supertest");
const app = require("../../index");
const UserModel = require("../../schema/UserModel"); // Substitua pelo caminho real do seu modelo

jest.mock("../../schema/UserModel"); // Substitua pelo caminho real do seu modelo

describe("Testando loginUser", () => {
  it("Deve retornar erro ao não encontrar o usuário", async () => {
    // Configurar o mock para retornar null ao procurar pelo nome
    UserModel.findOne.mockResolvedValueOnce(null);

    const nonExistingUser = {
      nome: "NonExistingUser",
      password: "password123",
    };

    const response = await request(app)
      .post("/user/login")
      .send(nonExistingUser);

    expect(response.statusCode).toBe(500); // Ou outro código de status apropriado
    expect(response.body.error).toBe("Erro ao logar um usuário");
    // Adicione mais expectativas conforme necessário
  });

  it("Deve retornar erro ao fornecer credenciais inválidas", async () => {
    const existingUser = {
      nome: "TestUser",
      password: "password123",
    };

    // Configurar o mock para retornar o usuário existente ao procurar pelo nome
    UserModel.findOne.mockResolvedValueOnce(existingUser);

    const invalidCredentials = {
      nome: "TestUser",
      password: "senhaIncorreta",
    };

    const response = await request(app)
      .post("/user/login")
      .send(invalidCredentials);

    expect(response.statusCode).toBe(500); // Ou outro código de status apropriado
    expect(response.body.error).toBe("Erro ao logar um usuário");
    // Adicione mais expectativas conforme necessário
  });
});
