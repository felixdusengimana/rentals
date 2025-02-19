import React from "react";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
