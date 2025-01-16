import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import animation from "../imagesTracker/Dumbbell_Loading.json";
import Lottie, { Options } from "react-lottie";
import axios_instance from "../utilities/AxiosInstance";
import DisplayError from "../component/ErrorComponent";
import { errorObject, errorResponse } from "../interfaces/IError";

interface RegisterObject {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const RegisterForm = (): React.ReactElement => {
  const status = { none: 0, inProgress: 1, done: 2 };
  const [nameInput, changeName] = useState<string>("");
  const [lastInput, changeLastName] = useState<string>("");
  const [emailInput, changeEmail] = useState<string>("");
  const [passwordInput, changePassword] = useState<string>("");
  const [registerStatusDone, setRegisterStatus] = useState<number>(status.none);
  const [error, setError] = useState<errorObject>({ error: "" });
  const nav = useNavigate();

  const fetchData = async () => {
    setRegisterStatus(status.inProgress);
    if (!emailInput || !passwordInput || !nameInput || !lastInput) {
      const stringError = "Please fill out all fields";
      const error: errorResponse = {
        response: { data: { error: stringError } },
      } as errorResponse;
      setError(error.response.data);
      throw Error(error.response.data.error);
    }

    const rObject: RegisterObject = {
      name: nameInput,
      lastName: lastInput,
      email: emailInput,
      password: passwordInput,
    };

    const response = await axios_instance.post(
      import.meta.env.VITE_BACKEND_URL + "/register/submit",
      rObject
    );

    return response;
  };

  const register = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError({ error: "" });
    try {
      const response = await fetchData();

      if (response.status == 200) {
        setRegisterStatus(status.done);
        setTimeout(() => nav("/logIn"), 1500);
      }
    } catch (error) {
      let errorResponse: errorObject;
      if ((error as Error).name == "Error") {
        errorResponse = { error: (error as Error).message };
      } else {
        errorResponse = (error as errorResponse).response.data;
      }
      setError(errorResponse);
    }
  };

  const updateName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changeName(e.target.value);
  };

  const updateLastName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changeLastName(e.target.value);
  };

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changeEmail(e.target.value);
  };

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changePassword(e.target.value);
  };

  if (registerStatusDone == status.done) {
    return (
      <div className="w-fill h-fill flex flex-col justify-center items-center">
        <p className="text-2xl font-bold">Register Successful</p>
      </div>
    );
  }

  if (registerStatusDone == status.inProgress && !error.error) {
    const options: Options = {
      animationData: animation,
      loop: true,
      autoplay: true,
    };
    return (
      <div className="w-fill h-fill flex items-center justify-center">
        <Lottie options={options} width={100} height={100} />
      </div>
    );
  }

  return (
    <form className="flex flex-col justify-center items-center">
      <input
        placeholder="Name"
        className="LoginInput mb-3"
        onChange={updateName}
        value={nameInput}
      />
      <input
        placeholder="Last Name"
        className="LoginInput mb-3"
        onChange={updateLastName}
        value={lastInput}
      />
      <input
        placeholder="Email"
        className="LoginInput mb-3"
        onChange={updateEmail}
        value={emailInput}
      />
      <input
        placeholder="Password"
        className="LoginInput mb-3"
        onChange={updatePassword}
        value={passwordInput}
      />
      {error.error != undefined ? <DisplayError errorLog={error} /> : null}
      <button
        className="loginButton hover:scale-105 transition-all"
        onClick={register}
      >
        Register
      </button>
      <NavLink
        to="/login"
        className="text-third text-center mt-2 hover:text-[rgba(141,33,246,0.5)] "
      >
        Back
      </NavLink>
    </form>
  );
};

const RegisterFormContainer = (): React.ReactElement => {
  return (
    <div className="bg-white bg-opacity-90 w-96 h-[450px] rounded-3xl flex justify-center relative overflow-hidden">
      <div className="absolute h-12 w-96 bg-main rotate-45 -right-1/3 top-[33]" />
      <div className="absolute h-12 w-96 bg-main -rotate-45 -left-1/3 top-[33]" />
      <div className="absolute h-12 w-96 bg-main rotate-45 right-1/3 bottom-0" />
      <div className="absolute h-12 w-96 bg-main -rotate-45 left-1/3 bottom-0" />
      <RegisterForm />
    </div>
  );
};

const RegisterPage = (): React.ReactElement => {
  return (
    <main className="bg-loginBackground w-screen h-screen flex justify-center items-center">
      <RegisterFormContainer />
    </main>
  );
};

export default RegisterPage;
