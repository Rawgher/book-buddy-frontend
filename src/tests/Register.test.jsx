import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Register from "../pages/Register/Register";

test("renders without crashing", () => {
  const { container } = render(
    <MemoryRouter>
      <Register signup={vi.fn()} />
    </MemoryRouter>
  );
  expect(container).toBeInTheDocument();
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Register signup={vi.fn()} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("submits form with correct data", async () => {
  const mockSignup = vi.fn(() => Promise.resolve());
  const { getByPlaceholderText, getByRole } = render(
    <MemoryRouter>
      <Register signup={mockSignup} />
    </MemoryRouter>
  );

  fireEvent.change(getByPlaceholderText("Username"), {
    target: { value: "newuser" },
  });
  fireEvent.change(getByPlaceholderText("Password"), {
    target: { value: "newpassword" },
  });
  fireEvent.change(getByPlaceholderText("Email"), {
    target: { value: "newuser@example.com" },
  });
  fireEvent.click(getByRole("button", { name: "Join Now" }));

  expect(mockSignup).toHaveBeenCalledWith({
    username: "newuser",
    password: "newpassword",
    email: "newuser@example.com",
  });
});
