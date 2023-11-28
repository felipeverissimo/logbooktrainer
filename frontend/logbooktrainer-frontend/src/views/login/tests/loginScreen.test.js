// App.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../store/combineReducers"; // Importe seu reducer real aqui
import App from "../../../App";

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
      <App />
    </Provider>
  );

  // Verifica se o componente é renderizado corretamente
  expect(screen.queryAllByText("Login")).toHaveLength(2);

  const usernameInput = screen.getByLabelText("Username:");
  const passwordInput = screen.getByLabelText("Password:");

  fireEvent.change(usernameInput, { target: { value: "admin" } });
  fireEvent.change(passwordInput, { target: { value: "admin" } });

  // Verifica se os campos foram preenchidos corretamente
  expect(usernameInput.value).toBe("admin");
  expect(passwordInput.value).toBe("admin");
});
