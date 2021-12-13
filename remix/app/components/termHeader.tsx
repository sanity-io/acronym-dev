const TermHeader = ({ term }: any) => {
  return (
    <h1
      className="inline-block p-1 px-3 italic font-bold text-white bg-pink-600 text-xxl">
      {term.toLocaleUpperCase()}
    </h1>
  );
};

export default TermHeader;
