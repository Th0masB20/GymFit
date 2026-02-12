import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios_instance from "../utilities/AxiosInstance";
import IUser from "../interfaces/IUser";
import { errorResponse } from "../interfaces/IError";

type setAgeProp = {
  setAge: React.Dispatch<React.SetStateAction<string>>;
};
type setHeightProp = {
  setHeight: React.Dispatch<React.SetStateAction<string>>;
};

type setWeightProp = {
  setWeight: React.Dispatch<React.SetStateAction<string>>;
};

type prop = {
  finished: React.Dispatch<React.SetStateAction<boolean>>;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  setAge: React.Dispatch<React.SetStateAction<string>>;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  age: string;
  height: string;
  weight: string;
  user: IUser;
};

interface ageHeightWeightProp {
  age: string;
  height: string;
  weight: string;
}

const InfoForm = ({
  finished,
  age,
  height,
  weight,
  setAge,
  setHeight,
  setWeight,
  user,
}: prop): React.ReactElement => {
  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-xl">Welcome, {user.name}</h1>
      {(() => {
        if (age == "") {
          return <AgeForm setAge={setAge} />;
        } else if (height == "") {
          return <HeightForm setHeight={setHeight} />;
        } else if (weight == "") {
          return <WeightForm setWeight={setWeight} />;
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
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const nav = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const userResponse = await axios_instance.get(
          import.meta.env.VITE_BACKEND_URL + "/home/user",
          {
            withCredentials: true,
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
          },
        );
        setUser(userResponse.data as IUser);
      } catch (error) {
        const responsError = (error as errorResponse).response.data.error;
        nav(`/404/${responsError}`);
      }
    }
    getData();
  }, [nav]);
  if (finishSetUp) {
    return (
      <>
        <FinishForm age={age} height={height} weight={weight} />
      </>
    );
  } else {
    return (
      <main className="w-screen h-screen flex justify-center items-center overscroll-none">
        <div className="bg-[#ECECEC] bg-opacity-90 w-96 h-96 rounded-3xl flex justify-center relative overflow-hidden shadow-2xl shadow-[rgba(0,0,0,0.9)]">
          <div className="absolute h-12 w-96 bg-main rotate-45 -right-1/3 top-[33]" />
          <div className="absolute h-12 w-96 bg-main -rotate-45 -left-1/3 top-[33]" />
          <div className="absolute h-12 w-96 bg-main rotate-45 right-1/3 bottom-0" />
          <div className="absolute h-12 w-96 bg-main -rotate-45 left-1/3 bottom-0" />
          <InfoForm
            finished={finished}
            setAge={setAge}
            setHeight={setHeight}
            setWeight={setWeight}
            age={age}
            height={height}
            weight={weight}
            user={user}
          />
        </div>
      </main>
    );
  }
};

const AgeForm = ({ setAge }: setAgeProp): React.ReactElement => {
  const [inputAge, changeAge] = useState<string>("");
  const updateAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumberAge: number = Number(e.target.value);
    if (e.target.value == "") {
      changeAge("");
      return;
    }
    if (isNaN(inputNumberAge)) {
      console.log("not a valid age number");
      e.target.value = "";
      return;
    }

    changeAge(inputNumberAge.toString());
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
          placeholder="0"
        />
      </label>
      <button className="nextButton" onClick={next}>
        Next
      </button>
    </form>
  );
};

const HeightForm = ({ setHeight }: setHeightProp): React.ReactElement => {
  const [inputHeight, changeHeight] = useState<string>("");
  const [inputHeightInch, changeHeightInch] = useState<string>("");

  const updateHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height: number = Number(e.target.value);
    if (e.target.value == "") {
      changeHeight("");
      return;
    } else if (isNaN(height)) {
      console.log("not a valid age number");
      e.target.value = "";
      return;
    }

    changeHeight(height.toString());
  };

  const updateHeightInch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const heightInch: number = Number(e.target.value);
    if (e.target.value == "") {
      changeHeightInch("");
      return;
    } else if (isNaN(heightInch)) {
      console.log("not a valid height number");
      e.target.value = "";
      return;
    }

    changeHeightInch(heightInch.toString());
  };

  const next = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let height = (
      Number(inputHeight) * 30.48 +
      Number(inputHeightInch) * 2.54
    ).toString();
    console.log(height);
    setHeight(height);
  };

  return (
    <form className="flex flex-col justify-center items-center h-60">
      <label className="flex flex-col justify-center items-center text-lx font-bold">
        Height
        <div className="flex items-center mt-2">
          <input
            type="text"
            onChange={updateHeight}
            value={inputHeight}
            placeholder="0"
            className="rounded-xl text-center w-20"
          />
          <p className="ml-1">'</p>

          <input
            type="text"
            onChange={updateHeightInch}
            value={inputHeightInch}
            placeholder="0"
            className="rounded-xl text-center w-20 ml-2"
          />
          <p className="ml-1">''</p>
        </div>
      </label>
      <button className="nextButton" onClick={next}>
        Next
      </button>
    </form>
  );
};

const WeightForm = ({ setWeight }: setWeightProp): React.ReactElement => {
  const [inputWeight, changeWeight] = useState<string>("");
  const updateWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight: number = Number(e.target.value);
    if (e.target.value == "") {
      changeWeight("");
      return;
    } else if (isNaN(weight)) {
      console.log("not a valid weight number");
      e.target.value = "";
      return;
    }

    changeWeight(weight.toString());
  };

  const next = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWeight(inputWeight);
  };

  return (
    <form className="flex flex-col justify-center items-center h-60">
      <label className="flex flex-col justify-center items-center text-lx font-bold">
        Weight
        <div className="flex items-center mt-2">
          <input
            type="text"
            onChange={updateWeight}
            value={inputWeight}
            placeholder="0"
            className="rounded-xl text-center w-20"
          />
          <p className="ml-1">lb</p>
        </div>
      </label>
      <button className="nextButton" onClick={next}>
        Next
      </button>
    </form>
  );
};

const FinishForm = ({
  age,
  height,
  weight,
}: ageHeightWeightProp): React.ReactElement => {
  const nav = useNavigate();
  useEffect(() => {
    async function update() {
      try {
        const response = await axios_instance.put(
          import.meta.env.VITE_BACKEND_URL + "/home/updateUser",
          { age, height, weight },
          {
            withCredentials: true,
          },
        );
        console.log(response);
      } catch (error) {
        const responsError = (error as errorResponse).response.data.error;
        nav(`/404/${responsError}`);
      }
    }
    update();
  }, [age, height, weight, nav]);
  const goToMainPage = () => {
    setTimeout(() => nav("/home"), 1500);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1
        className="text-3xl text-gray-600 animate-fadeIn"
        onAnimationEnd={goToMainPage}
      >
        You Are Ready To Begin You Workout Journey
      </h1>
    </div>
  );
};
export default InfoFormPage;
