import { useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
const ErrorPage = (): React.ReactElement => {
  const { error } = useParams();
  const nav = useNavigate();
  useEffect(() => {
    if (error == "Need to login" || error == "Token expired or not provided") {
      nav("/");
    }
  }, [error, nav]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <section className="w-80 h-80 bg-main rounded-xl flex justify-center items-center flex-col">
        <p className="text-center text-2xl text-white"> 404 Error</p>
        <p className="text-center text-2xl text-white">
          {error == "Access Token Expired" || error == "Refresh Token Expired"
            ? "Log Back In"
            : error}
        </p>
        {error == "Access Token Expired" ? (
          <NavLink
            to="/login"
            className="box-border bg-third h-auto py-2 px-5 mt-5 rounded-full text-white font-bold z-10 hover:scale-105 transition-all"
          >
            Login
          </NavLink>
        ) : (
          <NavLink
            to="/"
            className="box-border bg-third h-auto py-2 px-5 mt-5 rounded-full text-white font-bold z-10 hover:scale-105 transition-all"
          >
            Home Page
          </NavLink>
        )}
      </section>
    </div>
  );
};

export default ErrorPage;
