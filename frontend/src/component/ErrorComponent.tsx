import { errorObject } from "../interfaces/IError";

const DisplayError = ({
  errorLog,
}: {
  errorLog: errorObject;
}): React.ReactElement => {
  console.log(errorLog);
  return (
    <p className="w-60 text-center self-center mt-2 text-red-500">
      {errorLog.error}
    </p>
  );
};

export default DisplayError;
