/** @format */

import { render, screen } from "@testing-library/react";
import Greet from "./Greet";

test("Greet renders correctly", () => {
  render(<Greet />);
  const textElement = screen.getByText("Welcome");
  expect(textElement).toBeInTheDocument;
});

test("greet renders with name", () => {
  render(<Greet name="varsha" />);
  const textElement = screen.getByText("Welcome varsha");
  expect(textElement).toBeInTheDocument;
});
