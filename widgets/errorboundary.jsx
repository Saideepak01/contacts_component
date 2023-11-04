import React, { useState, useEffect } from "react";

export const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (error) => {
      setError(error);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (error) {
    return (
      <div>
        <h2>Something went wrong.</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return children;
};
