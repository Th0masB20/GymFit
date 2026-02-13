import { IWorkout } from "../../interfaces/IUser";

const ListOfWorkouts = ({
  workouts,
  selectedIndex,
  setSelectedIndex,
}: {
  workouts: IWorkout[];
  selectedIndex: number | undefined;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
}): React.ReactElement => {
  return (
    <div className="mt-8 max-h-24 overflow-y-scroll w-fit px-3 m-auto no-scrollbar">
      <ul>
        {workouts.map((workout, i) => {
          return (
            <WorkoutBlock
              workoutName={workout.workoutName}
              index={i}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              key={i}
            />
          );
        })}
        <WorkoutBlock
          workoutName="Rest"
          index={workouts.length}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </ul>
    </div>
  );
};

const WorkoutBlock = ({
  workoutName,
  setSelectedIndex,
  selectedIndex,
  index,
}: {
  workoutName: string;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedIndex: number | undefined;
  index: number;
}): React.ReactElement => {
  return (
    <button
      className={
        "block w-36 h-6 bg-fourth rounded-md mx-auto mt-1 hover:scale-105 transition-all " +
        (selectedIndex == index ? "border-2 border-black" : "")
      }
      onClick={() => {
        selectedIndex !== index
          ? setSelectedIndex(index)
          : setSelectedIndex(undefined);
      }}
    >
      {workoutName}
    </button>
  );
};

export default ListOfWorkouts;
