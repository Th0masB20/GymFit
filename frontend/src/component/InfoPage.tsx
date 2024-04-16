import React from "react";

const InfoForm = (): React.ReactElement => {};

const InfoFormPage = (): React.ReactElement => {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="bg-black bg-opacity-20 w-96 h-96 rounded-3xl flex justify-center relative overflow-hidden shadow-2xl">
        <div className="absolute h-12 w-96 bg-main rotate-45 -right-1/3 top-[33]" />
        <div className="absolute h-12 w-96 bg-main -rotate-45 -left-1/3 top-[33]" />
        <div className="absolute h-12 w-96 bg-main rotate-45 right-1/3 bottom-0" />
        <div className="absolute h-12 w-96 bg-main -rotate-45 left-1/3 bottom-0" />
        <InfoForm />
      </div>
    </main>
  );
};

export default InfoFormPage;
