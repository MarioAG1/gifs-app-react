import { useState } from "react";

export const useCounter = (initialValue: number = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const handleAdd = () => {
    setCounter(counter + 1);
  };

  const handleSubstract = () => {
    setCounter((prevstate) => prevstate - 1); // Si no disponemos de counter
  };

  const handleReset = () => {
    setCounter(initialValue);
  };
  return {
    //Properties
    counter,

    //Methods / Actions
    handleAdd,
    handleSubstract,
    handleReset,
  };
};

export default useCounter;
