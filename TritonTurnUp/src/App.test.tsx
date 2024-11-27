import React from 'react';
import { waitFor } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest'; // Vitest's describe and expect
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

describe("App", () => {
  test("Contains all elements", async () => {
    render(
      <GoogleOAuthProvider clientId="290101062369-d24quou81l9tk4ln0bnd7t9bnkta6230.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    );

    const home = screen.queryAllByText("Home");
    const profile = screen.queryByText("Profile");
    const calendar = screen.queryByText("Calendar");
    const login = screen.queryByText("Login");

    expect(home).to.exist;
    expect(profile).to.exist;
    expect(calendar).to.exist;
    expect(login).to.exist; 

  });
});

describe("Home", () => {
  test("Navbar exists", () => {
    render(
      <GoogleOAuthProvider clientId="290101062369-d24quou81l9tk4ln0bnd7t9bnkta6230.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    );

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
    render(
      <GoogleOAuthProvider clientId="290101062369-d24quou81l9tk4ln0bnd7t9bnkta6230.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    );

    const next = screen.queryByText("Next");
    const previous = screen.queryByText("Prev");

    expect(next).to.exist;
    expect(previous).to.exist;
  });

  test("Search bar exists", () => {
    render(
      <GoogleOAuthProvider clientId="290101062369-d24quou81l9tk4ln0bnd7t9bnkta6230.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    );

    const search = screen.queryByTestId("search-exists");

    expect(search).to.exist;
  });
});