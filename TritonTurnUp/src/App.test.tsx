import React from 'react';
import { waitFor } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest'; // Vitest's describe and expect
import '@testing-library/jest-dom';
import App from './App';
import Home from "./components/pages/Home"
import Profile from "./components/pages/Profile"
import Calendar from "./components/pages/Calendar"
import NoPage from './components/pages/NoPage'
import Login from './components/pages/Login'
import Search from './components/pages/Search'
import EventPage from './components/pages/EventPage'
import Navbar from './components/navbar/Navbar'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { vi } from 'vitest';

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

describe("Profile", () => {
  test("Displays user info when logged in", () => {
    const mockUser = {
      name: "John Doe",
      picture: "https://lh3.googleusercontent.com/a/ACg8ocIlJx6Gsw0xw1--BnrzII2Trh9FSeqCKdI2qf8LrPgt4KKJ0A=s96-c",
    };
  
    // Mock localStorage
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => JSON.stringify(mockUser));
  
    render(<Profile user={mockUser} login={() => {}} />);
  
    // Check if the user's name is rendered
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  
    // Check if the profile image is rendered correctly
    const profileImage = screen.getByAltText(/user profile/i);
    expect(profileImage).toHaveAttribute("src", mockUser.picture);
  });

  test("Displays login prompt when not logged in", () => {
    render(<Profile user={null} login={() => {}} />);

    expect(screen.getByText("Please log in with google to access your account.")).toBeInTheDocument();
  });
});