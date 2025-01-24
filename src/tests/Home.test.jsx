import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Home from "../pages/Home/Home";

test("renders without crashing", () => {
  const { container } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(container).toBeInTheDocument();
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
