import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=ebeac77fb0614b7dafa185816220408&q=52.02456913909303,-9.636417840550271&days=3"
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }, []);

  let locations = [
    {
      name: "Gap of Dunloe",
      boulders: 40,
      county: "Kerry",
      latitude: 52.02456913909303,
      longitude: -9.636417840550271,
    },
    {
      name: "Doolin",
      boulders: 130,
      county: "Clare",
      latitude: 53.03768028513782,
      longitude: -9.381295414348171,
    },
    {
      name: "Fair Head",
      boulders: 511,
      county: "Antrim",
      latitude: 55.22677471226471,
      longitude: -6.147370655469292,
    },
    {
      name: "Glenmacnass",
      boulders: 91,
      county: "Wicklow",
      latitude: 53.08049562688207,
      longitude: -6.379002901481163,
    },
    {
      name: "Glendalough",
      boulders: 219,
      county: "Wicklow",
      latitude: 53.00659217097069,
      longitude: -6.382179534789128,
    },
    {
      name: "Portrane",
      boulders: 67,
      county: "Dublin",
      latitude: 53.4877134928144,
      longitude: -6.1000056353936065,
    },
    {
      name: "Glendasan",
      boulders: 80,
      county: "Wicklow",
      latitude: 53.02337696129123,
      longitude: -6.3629271050246405,
    },
    {
      name: "Mourne mountains",
      boulders: 100,
      county: "Down",
      latitude: 54.157742111287604,
      longitude: -6.092829351171304,
    },
    {
      name: "Inishowen",
      boulders: 100,
      county: "Donegal",
      latitude: 55.361620632926325,
      longitude: -7.294088557516704,
    },
    {
      name: "Aughris Head",
      boulders: 20,
      county: "Sligo",
      latitude: 54.27828377751629,
      longitude: -8.757240305887496,
    },
  ];
  return (
    <div>
      <div>List of crags + info</div>

      {locations.map(({ name, boulders, county, latitude, longitude }) => (
        <ul key={name}>
          <p>{name}</p>
          <li>boulders: {boulders}</li>
          <li>county: {county}</li>
          <li>latitude: {latitude}</li>
          <li>longitude: {longitude}</li>
        </ul>
      ))}
    </div>
  );
}

export default App;
