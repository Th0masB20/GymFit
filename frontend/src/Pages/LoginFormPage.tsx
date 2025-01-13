import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios_instance from "../utilities/AxiosInstance";
import { errorObject, errorResponse } from "../interfaces/IError";
import DisplayError from "../component/ErrorComponent";
import Lottie, { Options } from "react-lottie";
import animation from "../imagesTracker/Dumbbell_Loading.json";

const SigninPage = (): React.ReactElement => {
  return (
    <main className="bg-loginBackground w-screen h-screen flex justify-center items-center">
      <CenterLogin />
    </main>
  );
};

const SignIn = (): React.ReactElement => {
  const status = { none: 0, inProgress: 1, done: 2 };
  const [emailInput, inputEmail] = useState("");
  const [passwordInput, inputPassword] = useState("");
  const [error, setError] = useState<errorObject>({ error: "" });
  const [registerStatusDone, setRegisterStatus] = useState<number>(status.none);
  const nav = useNavigate();

  const onchangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    inputPassword(e.target.value);
  };

  const onchangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    inputEmail(e.target.value);
  };

  const pressedEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      logInRequest();
    }
  };

  const loginPostRequest = async () => {
    setRegisterStatus(status.inProgress);
    if (!emailInput || !passwordInput) {
      const stringError = "Username or Password is empty";
      const error: errorResponse = {
        response: { data: { error: stringError } },
      } as errorResponse;
      setError(error.response.data);
      throw Error(error.response.data.error);
    }
    const response = await axios_instance.post(
      "/login/loginUser",
      {
        email: emailInput,
        password: passwordInput,
      },
      {
        headers: { Accept: "application/json" },
        withCredentials: true,
      }
    );
    return response;
  };

  const logInRequest = async (e?: React.FormEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    setError({ error: "" });
    try {
      const response = await loginPostRequest();
      if (response.status == 200) {
        setTimeout(() => {
          setRegisterStatus(status.done);
          nav("/home");
        }, 1000);
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
    <div className="flex flex-col justify-center">
      <p className="my-4 font-semibold pl-1">Log In</p>
      <input
        className="LoginInput mb-4"
        placeholder="Email"
        onChange={onchangeEmail}
        value={emailInput}
        onKeyDown={pressedEnter}
      />
      <input
        className="LoginInput"
        placeholder="Password"
        onChange={onchangePassword}
        value={passwordInput}
        onKeyDown={pressedEnter}
      />
      {error != undefined ? <DisplayError errorLog={error} /> : null}
      <button
        className="self-center loginButton hover:scale-105 transition-all"
        onClick={logInRequest}
      >
        Log In
      </button>
      <NavLink
        to="/register"
        className="text-lg text-third hover:opacity-50 mt-2 mx-auto text-center w-20"
      >
        Register
      </NavLink>
      <NavLink to="/" className="self-center hover:opacity-70">
        Back
      </NavLink>
    </div>
  );
};

const CenterLogin = (): React.ReactElement => {
  return (
    <div className="bg-white bg-opacity-90 w-96 h-96 rounded-3xl flex justify-center relative overflow-hidden">
      <div className="absolute h-12 w-96 bg-main rotate-45 -right-1/3 top-[33]" />
      <div className="absolute h-12 w-96 bg-main -rotate-45 -left-1/3 top-[33]" />
      <div className="absolute h-12 w-96 bg-main rotate-45 right-1/3 bottom-0" />
      <div className="absolute h-12 w-96 bg-main -rotate-45 left-1/3 bottom-0" />
      <SignIn />
    </div>
  );
};

export default SigninPage;
