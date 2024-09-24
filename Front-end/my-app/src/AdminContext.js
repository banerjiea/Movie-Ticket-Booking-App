// UserContext.js
import React, { createContext, useState, useContext } from "react";

// Create a Context for the user data
const AdminContext = createContext();

// Create a custom hook for consuming the UserContext easily
export const useAdmin = () => useContext(AdminContext);

// UserProvider component to wrap the application
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // Initialize user state

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
