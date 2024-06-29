interface ITimerComponent {
  seconds: number;
  minutes: number;
  hours: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  setHour: React.Dispatch<React.SetStateAction<number>>;
}

export default ITimerComponent;
