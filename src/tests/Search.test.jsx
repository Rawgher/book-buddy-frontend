import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookSearch from "../pages/Search/Search";

test("renders without crashing", () => {
  const { container } = render(<BookSearch />);
  expect(container).toBeInTheDocument();
});

test("matches snapshot", () => {
  const { asFragment } = render(<BookSearch />);
  expect(asFragment()).toMatchSnapshot();
});

test("handles search input change", () => {
  const { getByPlaceholderText } = render(<BookSearch />);
  const input = getByPlaceholderText("Enter title");

  fireEvent.change(input, { target: { value: "Harry Potter" } });
  expect(input.value).toBe("Harry Potter");
});
