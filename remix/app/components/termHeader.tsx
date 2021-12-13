import React from "react";

const TermHeader = ({ term }: any) => {
  return (
    <h1 className="font-bold text-xxl bg-pink-600 text-white inline-block p-1 px-3 italic">
      {term.toUpperCase()}
    </h1>
  );
};

export default TermHeader;
