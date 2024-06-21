import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

interface RegisterObject {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

interface errorResconse {
  response: { data: string };
}

const RegisterForm = (): React.ReactElement => {
  const [nameInput, changeName] = useState("");
  const [lastInput, changeLastName] = useState("");
  const [emailInput, changeEmail] = useState("");
  const [passwordInput, changePassword] = useState("");
  const nav = useNavigate();

  const register = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const rObject: RegisterObject = {
      name: nameInput,
      lastName: lastInput,
      email: emailInput,
      password: passwordInput,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/register/submit",
        rObject
      );
      if (response.status == 200) {
        setTimeout(() => nav("/logIn"), 2000);
        return (
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            <p className="text-2xl font-bold">Register Successful</p>
          </div>
        );
      }
    } catch (error) {
      const errorResponse = (error as errorResconse).response.data;
      console.log(errorResponse);
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
      <button className="loginButton" onClick={register}>
        Register
      </button>
      <NavLink to="/login" className="text-third text-center mt-2">
        Back
      </NavLink>
    </form>
  );
};

const RegisterFormContainer = (): React.ReactElement => {
  return (
    <div className="bg-white bg-opacity-90 w-96 h-[400px] rounded-3xl flex justify-center relative overflow-hidden">
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
