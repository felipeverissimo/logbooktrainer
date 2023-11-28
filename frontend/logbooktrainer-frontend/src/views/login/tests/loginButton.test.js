import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

test("Teste de clique no botão login", () => {
  const handleClickButon = jest.fn();

  render(
    <button data-testid="loginButton" onClick={handleClickButon}>
      Login
    </button>
  );

  fireEvent.click(screen.getByTestId("loginButton"));
  expect(handleClickButon).toHaveBeenCalledTimes(1);
});
