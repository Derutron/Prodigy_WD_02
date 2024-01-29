import { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const lapTimesRef = useRef([]);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, startTime]);

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(Date.now() - elapsedTime);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    lapTimesRef.current = [];
  };

  const handleLap = () => {
    if (startTime !== null) {
      const lapTime = Date.now() - startTime;
      const previousLap = lapTimesRef.current[lapTimesRef.current.length - 1];
      const difference = previousLap ? lapTime - previousLap.lapTime : 0;
      lapTimesRef.current.push({ lapTime, difference });
    }
  };

  const formatTime = (time) => {
    const ms = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, '0')}:
            ${minutes.toString().padStart(2, '0')}:
            ${seconds.toString().padStart(2, '0')}.
            ${ms.toString().padStart(3, '0')}`;
  };

  return (
    <div>
      <div className="w-screen h-screen bg-blue-100 mx-auto p-4">
        <h1 className='text-center my-10 font-[500] lg:text-6xl md:text-4xl sm:text-2xl '>STOP WATCH</h1>
        <div className="text-center font-[500] mb-4 lg:text-4xl md:text-3xl sm:text-2xl">
          {formatTime(elapsedTime)}
        </div>

        <div className="flex justify-center mb-4">
          {!isRunning ? (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
              onClick={handleStart}
            >
              Start
            </button>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
              onClick={handlePause}
            >
              Pause
            </button>
          )}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
            onClick={handleLap}
          >
            Lap
          </button>

          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mx-2 rounded"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {lapTimesRef.current.length > 0 && (
          <div>
            <h2 className="text-center font-bold my-5 lg:text-3xl md:text-2xl sm:text-2xl">Lap Times:</h2>
            <div className='flex justify-center'>
              <ol className="list-decimal lg:text-3xl md:text-2xl sm:text-2xl font-[600] pl-8">
                {lapTimesRef.current.map(({ lapTime, difference }, index) => (
                  <li key={index}>
                    {`Lap ${index + 1}: ${formatTime(lapTime)}`}
                    {difference !== undefined && ` | (+${formatTime(difference)})`}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



export default Stopwatch;