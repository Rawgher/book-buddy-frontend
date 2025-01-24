import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Profile from "../pages/Profile/Profile";

const mockCurrentUser = { username: "testuser", email: "testuser@example.com" };

test("renders without crashing", () => {
  const { container } = render(
    <MemoryRouter>
      <Profile currentUser={mockCurrentUser} />
    </MemoryRouter>
  );
  expect(container).toBeInTheDocument();
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Profile currentUser={mockCurrentUser} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
