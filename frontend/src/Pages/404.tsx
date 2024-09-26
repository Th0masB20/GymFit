import { useParams } from "react-router-dom";
const ErrorPage = (): React.ReactElement => {
  const { error } = useParams();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <section className="w-80 h-80 bg-main rounded-xl flex justify-center items-center flex-col">
        <p className="text-center text-2xl text-white"> 404 Error</p>
        <p className="text-center text-2xl text-white">{error}</p>.
      </section>
    </div>
  );
};

export default ErrorPage;
