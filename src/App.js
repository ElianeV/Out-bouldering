import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    fetch(
      "http://api.weatherapi.com/v1/current.json?key=ebeac77fb0614b7dafa185816220408&q=London&aqi=no"
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }, []);

  return <div className="testAPI"> Test API</div>;
}

export default App;
