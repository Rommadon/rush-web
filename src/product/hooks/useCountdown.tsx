import { useState, useEffect } from "react";

export const useCountdown = (endedAt: Date) => {
  const [remaining, setRemaining] = useState(
    endedAt.valueOf() - Date.now()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(interval)
      } else {
        setRemaining(remaining - 1000);    
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [remaining]);

  const day = Math.floor((remaining / (1000*60*60*24)));
  const hour = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minute = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const second = Math.floor((remaining % (1000 * 60)) / 1000);

  return {
    hour,
    minute,
    second,
    day,
    formattedDay: day.toString().padStart(2, "0"),
    formattedHour: hour.toString().padStart(2, "0"),
    formattedMinute: minute.toString().padStart(2, "0"),
    formattedSecond: second.toString().padStart(2, "0"),
  }
}

export default useCountdown