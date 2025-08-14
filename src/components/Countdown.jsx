import { useState, useEffect } from "react";

function Countdown({ unlockDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(unlockDate) - new Date();
    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);
      if (!updatedTimeLeft) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, unlockDate]);

  if (!timeLeft) {
    return (
      <p className="text-center text-green-600 font-bold">
        This capsule is now unlocked!
      </p>
    );
  }

  return (
    <div className="text-center p-4 bg-yellow-100 rounded font-mono text-lg">
      <p>Time until unlock:</p>
      <div className="flex justify-center gap-4 mt-2 text-xl font-semibold">
        <div>
          <span>{timeLeft.days}</span> <br /> days
        </div>
        <div>
          <span>{timeLeft.hours.toString().padStart(2, "0")}</span> <br /> hours
        </div>
        <div>
          <span>{timeLeft.minutes.toString().padStart(2, "0")}</span> <br />{" "}
          minutes
        </div>
        <div>
          <span>{timeLeft.seconds.toString().padStart(2, "0")}</span> <br />{" "}
          seconds
        </div>
      </div>
    </div>
  );
}

export default Countdown;
