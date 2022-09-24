import "./App.scss";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";

function App() {
  let maxDate = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);
  const [value, setDate] = useState(new Date());
  const [allWeather, setAllWeather] = useState([]);
  // const [dayWeather, setDayWeather] = useState();
  const dayTimes = ["09:00:00", "12:00:00", "15:00:00", "18:00:00"];
  const pickedDate = createUTCDateForISO(value);
  const locations = [
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
    // {
    //   name: "Fair Head",
    //   boulders: 511,
    //   county: "Antrim",
    //   latitude: 55.22677471226471,
    //   longitude: -6.147370655469292,
    // },
    // {
    //   name: "Glendalough",
    //   boulders: 219,
    //   county: "Wicklow",
    //   latitude: 53.00659217097069,
    //   longitude: -6.382179534789128,
    // },
    // {
    //   name: "Portrane",
    //   boulders: 67,
    //   county: "Dublin",
    //   latitude: 53.4877134928144,
    //   longitude: -6.1000056353936065,
    // },
    // {
    //   name: "Mourne mountains",
    //   boulders: 100,
    //   county: "Down",
    //   latitude: 54.157742111287604,
    //   longitude: -6.092829351171304,
    // },
    // {
    //   name: "Inishowen",
    //   boulders: 100,
    //   county: "Donegal",
    //   latitude: 55.361620632926325,
    //   longitude: -7.294088557516704,
    // },
    // {
    //   name: "Aughris Head",
    //   boulders: 20,
    //   county: "Sligo",
    //   latitude: 54.27828377751629,
    //   longitude: -8.757240305887496,
    // },
  ];

  function createUTCDateForISO(value) {
    const offset = value.getTimezoneOffset();
    const myDate = value - offset * 60 * 1000;
    const dateAsISO = new Date(myDate).toISOString();

    return dateAsISO.substring(0, 10);
  }

  useEffect(() => {
    const promises = locations.map((location) =>
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=9e7a95161ad9e25ea439cfe0a77e5459&units=metric`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error))
    );
    Promise.all(promises).then((responses) => {
      setAllWeather(responses);
    });
  }, []);

  useEffect(() => {
    const singleDayData = allWeather.map((location) =>
      location.list.filter((weatherPeriod) => {
        return (
          weatherPeriod.dt_txt.slice(0, 10) === pickedDate &&
          dayTimes.includes(weatherPeriod.dt_txt.slice(-8))
        );
      })
    );
    console.log(singleDayData);
    // console.log("Average prob of percip " + singleDayData[0][0].pop * 10 + "%");
    // console.log("average temp " + singleDayData[0][0].main.temp);
  }, [pickedDate, allWeather]);

  return (
    <div>
      <DatePicker
        value={value}
        onChange={setDate}
        maxDate={maxDate}
        minDate={new Date()}
      />

      <ul>
        <li>Doolin: Avg temp {}</li>
      </ul>
    </div>
  );
}

export default App;
