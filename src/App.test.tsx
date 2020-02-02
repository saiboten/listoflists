import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders create phase 1 button", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Lag fase 1/i);
  expect(linkElement).toBeInTheDocument();
});
