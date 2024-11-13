import React from 'react';
import { waitFor } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest'; // Vitest's describe and expect
import App from './App';

describe("App", () => {
  test("Contains all elements", async () => {
    render(<App />);

    const home = screen.queryAllByText("Home");
    const profile = screen.queryByText("Profile");
    const calendar = screen.queryByText("Calendar");
    const login = screen.queryByText("Login");
    const signup = screen.queryByText("Sign Up");

    expect(home).to.exist;
    expect(profile).to.exist;
    expect(calendar).to.exist;
    expect(login).to.exist;
    expect(signup).to.exist;

  });
});

describe("Home", () => {
  test("Navbar exists", () => {
    render(<App />);

    const navButton = screen.getByTestId("open-menu");
    expect(navButton).to.exist;

    fireEvent.click(navButton);

    const home = screen.queryAllByText("Home");
    const profile = screen.queryByText("Profile");
    const calendar = screen.queryByText("Calendar");

    expect(home).to.exist;
    expect(profile).to.exist;
    expect(calendar).to.exist;
  });

  test("Event card exists", () => {
    render(<App />);

    const eventTitle = screen.queryByText("Event Title");
    const label = screen.queryAllByText("Label");

    expect(eventTitle).to.exist;
    expect(label).to.exist;
  });
});