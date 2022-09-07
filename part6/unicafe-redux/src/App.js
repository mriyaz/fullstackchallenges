import React from "react";
import ReactDOM from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const good = () => {
    dispatch({
      type: "GOOD",
    });
  };
  const ok = () => {
    dispatch({
      type: "OK",
    });
  };
  const bad = () => {
    dispatch({
      type: "BAD",
    });
  };
  const reset = () => {
    dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {counter.good}</div>
      <div>ok {counter.ok}</div>
      <div>bad {counter.bad}</div>
    </div>
  );
};

export default App;
