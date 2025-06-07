import { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const [step, setStep] = useState(1);
  const [max, setMax] = useState(10);

  useEffect(() => {
    let interval;
    if (isAuto) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          const next = prevCount + step;
          return next <= max ? next : prevCount; 
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAuto, step, max]);

  const increment = () => {
    setCount((prev) => {
      const next = prev + step;
      return next <= max ? next : prev;
    });
  };

  const decrement = () => {
    setCount((prev) => {
      const next = prev - step;
      return next >= 0 ? next : 0;
    });
  };

  const reset = () => {
    setCount(0);
    setStep(1);
    setMax(100);
  };

  const toggleAuto = () => setIsAuto((prev) => !prev);

  return (
    <div style={styles.container}>
      <h2>Counter with Auto-Increment</h2>
      <h1>{count}</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Step:{" "}
          <input
            type="number"
            value={step}
            min="1"
            onChange={(e) => {
              const val = Number(e.target.value);
              setStep(val < 1 ? 1 : val);
              if (val > max) setMax(val);
            }}
            style={{ width: "50px" }}
          />
        </label>
        <label style={{ marginLeft: "1rem" }}>
          Max Value:{" "}
          <input
            type="number"
            value={max}
            min={step}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val < step) {
                setMax(step);
              } else {
                setMax(val);
              }
            }}
            style={{ width: "70px" }}
          />
        </label>
      </div>

      <div>
        <button onClick={increment}>➕ Increment</button>
        <button onClick={decrement}>➖ Decrement</button>
        <button onClick={reset}>🔁 Reset</button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={toggleAuto}>
          {isAuto ? "⏸ Stop Auto-Increment" : "▶ Start Auto-Increment"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "2rem",
  },
};

export default Counter;
