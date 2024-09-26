import IJsonExercise from "../interfaces/IJsonExercise";

const getExercises = async (): Promise<IJsonExercise> => {
    const options: object = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.VITE_EXERCISE_API_KEY,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        }
    }

    const response = await fetch("https://exercisedb.p.rapidapi.com/exercises?limit=1324&offset=0", options)
    const jsonData: IJsonExercise = await response.json();
    return jsonData;
}

export default getExercises