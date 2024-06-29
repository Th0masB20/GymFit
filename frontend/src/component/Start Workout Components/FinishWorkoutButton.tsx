const FinishWorkoutButton = ({
  finishWorkout,
}: {
  finishWorkout: () => void;
}): React.ReactElement => {
  return (
    <div
      className={
        "h-28 fixed w-full bg-footer-background bottom-0 flex flex-col justify-center items-center transition-all duration-200"
      }
    >
      <button
        className={
          "w-64 h-10 bg-main rounded-lg hover:scale-110 text-center text-xl flex items-center justify-center transition-all duration-100"
        }
        onClick={finishWorkout}
      >
        Finish Workout
      </button>
    </div>
  );
};

export default FinishWorkoutButton;
