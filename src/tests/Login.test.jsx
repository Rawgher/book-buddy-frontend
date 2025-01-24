import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login/Login";

test("renders without crashing", () => {
  const { container } = render(
    <MemoryRouter>
      <Login login={vi.fn()} />
    </MemoryRouter>
  );
  expect(container).toBeInTheDocument();
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Login login={vi.fn()} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("submits form with correct data", async () => {
  const mockLogin = vi.fn(() => Promise.resolve());
  const { getByPlaceholderText, getByRole } = render(
    <MemoryRouter>
      <Login login={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.change(getByPlaceholderText("Username"), {
    target: { value: "testuser" },
  });
  fireEvent.change(getByPlaceholderText("Password"), {
    target: { value: "password123" },
  });
  fireEvent.click(getByRole("button", { name: "Log In" }));

  expect(mockLogin).toHaveBeenCalledWith({
    username: "testuser",
    password: "password123",
  });
});
