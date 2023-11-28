const request = require("supertest");
const app = require("../../index");
const ExercicesModel = require("../../schema/ExercicesModel"); // Substitua pelo caminho real do seu modelo

jest.mock("../../schema/ExercicesModel"); // Substitua pelo caminho real do seu modelo

describe("Testando createExercice", () => {
  it("Deve criar um exercício com sucesso", async () => {
    const newExerciceData = {
      data: "2023-11-28",
      tipoExercicio: "Levantamento de Peso",
      peso: 50,
      repeticao: 10,
      notas: "Bom treino",
      usuarioId: "1234567890", 
    };

    ExercicesModel.prototype.save.mockResolvedValueOnce(newExerciceData);

    const response = await request(app).post("/save").send(newExerciceData);
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Exercício criado com sucesso!");
  });

  it("Deve retornar erro ao falhar ao criar um exercício", async () => {
    const newExerciceData = {
      data: "2023-11-28",
      tipoExercicio: "Levantamento de Peso",
      peso: 50,
      repeticao: 10,
      notas: "Bom treino",
      usuarioId: "1234567890", /
    };

    ExercicesModel.prototype.save.mockRejectedValueOnce(
      new Error("Erro ao salvar o exercício")
    );

    const response = await request(app).post("/save").send(newExerciceData);

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe("Erro ao criar exercício");
  });
});
