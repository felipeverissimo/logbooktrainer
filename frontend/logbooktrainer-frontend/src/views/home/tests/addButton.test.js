import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

test("Teste de clique no botão adicionar", () => {
  const handleClickButon = jest.fn();

  render(
    <button data-testid="addButton" onClick={handleClickButon}>
      Adicionar
    </button>
  );

  fireEvent.click(screen.getByTestId("addButton"));
  expect(handleClickButon).toHaveBeenCalledTimes(1);
});
