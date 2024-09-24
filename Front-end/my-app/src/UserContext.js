// UserContext.js
import React, { createContext, useState, useContext } from "react";

// Create a Context for the user data
const UserContext = createContext();

// Create a custom hook for consuming the UserContext easily
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap the application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
