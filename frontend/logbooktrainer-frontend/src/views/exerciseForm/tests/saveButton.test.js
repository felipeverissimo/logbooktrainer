import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

test("Teste de clique no botão salvar", () => {
  const handleClickButon = jest.fn();

  render(
    <button data-testid="saveButton" onClick={handleClickButon}>
      Salvar
    </button>
  );

  fireEvent.click(screen.getByTestId("saveButton"));
  expect(handleClickButon).toHaveBeenCalledTimes(1);
});
