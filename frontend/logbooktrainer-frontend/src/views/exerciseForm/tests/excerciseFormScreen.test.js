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

  test("renders the ExercisesForm component", () => {
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

  test("handles changes in form fields", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ExercisesForm />
        </MemoryRouter>
      </Provider>
    );

    const typeExercice = screen.getByLabelText("Tipo do exercício");
    const repetition = screen.getByLabelText("Repetição");

    // Simulate user input
    fireEvent.change(typeExercice, {
      target: { value: "Supino Reto" },
    });
    fireEvent.change(repetition, {
      target: { value: "10" },
    });

    // console.log(weight);
    // Verify that the form fields have been updated
    expect(typeExercice.value).toBe("Supino Reto");
    expect(repetition.value).toBe("10");
  });
});
