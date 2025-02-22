import { createSignal } from "solid-js";

export function Counter() {
  const [count, setCount] = createSignal(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <div>Current count: {count()}</div>
      <button onClick={increment}>Increment</button>
    </>
  );
}