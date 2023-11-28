// App.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import rootReducer from "../../../store/combineReducers"; // Importe seu reducer real aqui
import Home from "../index";

const store = createStore(rootReducer); // Crie sua store real aqui

const mockUseDispatch = jest.fn();
const mockUseNavigate = jest.fn();
const mockUseAuth = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockUseDispatch,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

jest.mock("../../../AuthContext", () => ({
  ...jest.requireActual("../../../AuthContext"),
  useAuth: () => mockUseAuth,
}));

test("Renderiza o App com o Provider e testa navegação", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText("Bem Vindo")).toBeInTheDocument();

  expect(screen.getByText("Adicionar")).toBeInTheDocument();
});
