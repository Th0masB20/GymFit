import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IUser from "../interfaces/IUser";

type setAgeProp = {
  setAge: React.Dispatch<React.SetStateAction<number | undefined>>;
};
type setHeightProp = {
  setHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
};

type prop = {
  finished: React.Dispatch<React.SetStateAction<boolean>>;
  setHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  setAge: React.Dispatch<React.SetStateAction<number | undefined>>;
  age: number | undefined;
  height: number | undefined;
  user: IUser;
};

interface ageHeightProp {
  age: number | undefined;
  height: number | undefined;
}

const InfoForm = ({
  finished,
  age,
  height,
  setAge,
  setHeight,
  user,
}: prop): React.ReactElement => {
  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-xl">Welcome, {user.name}</h1>
      {(() => {
        if (age == undefined) {
          return <AgeForm setAge={setAge} />;
        } else if (height == undefined) {
          return <HeightForm setHeight={setHeight} />;
        } else {
          finished(true);
          return;
        }
      })()}
    </section>
  );
};

const InfoFormPage = (): React.ReactElement => {
  const [finishSetUp, finished] = useState(false);

  const [user, setUser] = useState({} as IUser);
  const [age, setAge] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);

  const nav = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const userResponse = await axios.get("http://localhost:3000/home", {
          withCredentials: true,
        });
        setUser(userResponse.data as IUser);
      } catch (error) {
        nav("/404");
      }
    }
    getData();
  }, [nav]);

  if (finishSetUp) {
    return (
      <>
        <FinishForm age={age} height={height} />
      </>
    );
  } else {
    return (
      <main className="w-screen h-screen flex justify-center items-center">
        <div className="bg-[#ECECEC] bg-opacity-90 w-96 h-96 rounded-3xl flex justify-center relative overflow-hidden shadow-2xl shadow-[rgba(0,0,0,0.9)]">
          <div className="absolute h-12 w-96 bg-main rotate-45 -right-1/3 top-[33]" />
          <div className="absolute h-12 w-96 bg-main -rotate-45 -left-1/3 top-[33]" />
          <div className="absolute h-12 w-96 bg-main rotate-45 right-1/3 bottom-0" />
          <div className="absolute h-12 w-96 bg-main -rotate-45 left-1/3 bottom-0" />
          <InfoForm
            finished={finished}
            setAge={setAge}
            setHeight={setHeight}
            age={age}
            height={height}
            user={user}
          />
        </div>
      </main>
    );
  }
};

const AgeForm = ({ setAge }: setAgeProp): React.ReactElement => {
  const [inputAge, changeAge] = useState(0);
  const updateAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName: number = Number(e.target.value);
    if (isNaN(inputName)) {
      console.log("not a valid age number");
      e.target.value = "";
      e.target.placeholder = "0";
      return;
    }

    changeAge(inputName);
  };

  const next = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAge(inputAge);
    return;
  };

  return (
    <form className="flex flex-col justify-center items-center h-60">
      <label className="flex flex-col justify-center items-center text-lx font-bold">
        Age
        <input
          type="text"
          onChange={updateAge}
          value={inputAge}
          className="rounded-xl text-center mt-2 w-20"
        />
      </label>
      <button className="nextButton" onClick={next}>
        Next
      </button>
    </form>
  );
};

const HeightForm = ({ setHeight }: setHeightProp): React.ReactElement => {
  const [inputHeight, changeHeight] = useState(0);
  const updateAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height: number = Number(e.target.value);
    if (isNaN(height)) {
      console.log("not a valid age number");
      e.target.value = "";
      e.target.placeholder = "0";
      return;
    }

    changeHeight(height);
  };

  const next = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHeight(inputHeight);
  };

  return (
    <form className="flex flex-col justify-center items-center h-60">
      <label className="flex flex-col justify-center items-center text-lx font-bold">
        Height
        <input
          type="text"
          onChange={updateAge}
          value={inputHeight}
          className="rounded-xl text-center mt-2 w-20"
        />
      </label>
      <button className="nextButton" onClick={next}>
        Next
      </button>
    </form>
  );
};

const FinishForm = ({ age, height }: ageHeightProp): React.ReactElement => {
  const nav = useNavigate();
  useEffect(() => {
    async function update() {
      try {
        const response = await axios.put(
          "http://localhost:3000/home/updateUser",
          { age, height },
          {
            withCredentials: true,
          }
        );

        console.log(response);
      } catch (e) {
        nav("/404");
      }
    }
    update();
  }, []);
  const goToMainPage = () => {
    setTimeout(() => nav("/home"), 1500);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1
        className="text-3xl text-gray-600 animate-fadeIn"
        onAnimationEnd={goToMainPage}
      >
        You Are Ready To Begin You Workout Journy
      </h1>
    </div>
  );
};
export default InfoFormPage;
