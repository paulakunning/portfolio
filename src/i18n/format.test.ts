import { expect, it } from "vitest";
import { formatMessage } from "./format";

it("replaces placeholders", () => {
  expect(formatMessage("Escribí al menos {min} caracteres.", { min: 2 })).toBe(
    "Escribí al menos 2 caracteres.",
  );
});

it("leaves unknown placeholders untouched", () => {
  expect(formatMessage("Hola {name}", {})).toBe("Hola {name}");
});
