import React from "react";

const ErrorPage = (): React.ReactElement => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <section className="w-80 h-80 bg-main rounded-xl flex justify-center items-center">
        <p className="text-center text-2xl text-white"> 404 error</p>
      </section>
    </div>
  );
};

export default ErrorPage;
