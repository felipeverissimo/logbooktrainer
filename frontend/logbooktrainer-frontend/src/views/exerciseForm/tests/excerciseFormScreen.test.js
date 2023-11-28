import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import rootReducer from "../../../store/combineReducers"; // Importe seu reducer real aqui
import { Provider } from "react-redux";

import ExercisesForm from "../index";

describe("ExercisesForm", () => {
  const store = createStore(rootReducer);

  test("renderiza o componente ExerciseForm", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ExercisesForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Exercicio")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo do exercício")).toBeInTheDocument();
    expect(screen.getByLabelText("Peso")).toBeInTheDocument();
    expect(screen.getByLabelText("Repetição")).toBeInTheDocument();
    // expect(screen.getByLabelText("Notas pessoais")).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
  });

  test("Manusear a mudança de campos", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ExercisesForm />
        </MemoryRouter>
      </Provider>
    );

    const typeExercice = screen.getByLabelText("Tipo do exercício");
    const repetition = screen.getByLabelText("Repetição");

    fireEvent.change(typeExercice, {
      target: { value: "Supino Reto" },
    });
    fireEvent.change(repetition, {
      target: { value: "10" },
    });

    expect(typeExercice.value).toBe("Supino Reto");
    expect(repetition.value).toBe("10");
  });
});
