import React, { createContext, useContext } from "react";

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("for got combined");
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <LoadingContext.Provider value={{ setLoading, loading }}>
      {children}
    </LoadingContext.Provider>
  );
};
