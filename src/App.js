import "./App.scss";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import climber from "./images/climber.png";
import mapIreland from "./images/mapIreland.png";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

function App() {
  let maxDate = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);
  const [value, setDate] = useState(new Date());
  const [allWeather, setAllWeather] = useState([]);
  const [dayWeather, setDayWeather] = useState([]);
  const dayTimes = ["09:00:00", "12:00:00", "15:00:00", "18:00:00"];
  const pickedDate = createUTCDateForISO(value);
  const locations = [
    {
      name: "Aughris Head",
      boulders: 20,
      county: "Sligo",
      latitude: 54.27828377751629,
      longitude: -8.757240305887496,
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
    //   name: "Gap of Dunloe",
    //   boulders: 40,
    //   county: "Kerry",
    //   latitude: 52.02456913909303,
    //   longitude: -9.636417840550271,
    // },
    // {
    //   name: "Glendalough",
    //   boulders: 219,
    //   county: "Wicklow",
    //   latitude: 53.00659217097069,
    //   longitude: -6.382179534789128,
    // },
    // {
    //   name: "Inishowen",
    //   boulders: 100,
    //   county: "Donegal",
    //   latitude: 55.361620632926325,
    //   longitude: -7.294088557516704,
    // },
    // {
    //   name: "Mourne mountains",
    //   boulders: 100,
    //   county: "Down",
    //   latitude: 54.157742111287604,
    //   longitude: -6.092829351171304,
    // },
    // {
    //   name: "Portrane",
    //   boulders: 67,
    //   county: "Dublin",
    //   latitude: 53.4877134928144,
    //   longitude: -6.1000056353936065,
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
    setDayWeather(singleDayData);
  }, [pickedDate, allWeather]);

  return (
    <>
      <main class="fullPage">
        <div class="cover top absolute"></div>
        <div class="shade absolute"></div>
        <div class="greenblock absolute">
          <h3>Discover Ireland's wildest climbing spots</h3>
        </div>
        <div class="cover bottom absolute"></div>
        <section class="absolute">
          <h1>out</h1>
          <h2>bouldering</h2>
        </section>
      </main>
      <div class="description fullPage">
        <div class="allMapContent">
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <div class="map">
              <img
                style={{ width: "100%", height: "100%" }}
                src={mapIreland}
                alt="A map of Ireland with the most popular climbing locations highlighted."
              />
            </div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <div class="mapText">
              <p>
                Ireland is known for its diverse and untamed landscape which
                harbours some of the most amazing climbing areas out in nature.
                The Atlantic ocean offers a mild climate yet weather is
                changeable with frequent rainfall. Get a swift overview of the
                weather at some of the most popular bouldering locations, easy
                to compare and plan your trip.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      <div class="weather fullPage">
        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
          <div class="allWeatherContent">
            <div class="weatherResults">
              <DatePicker
                value={value}
                onChange={setDate}
                maxDate={maxDate}
                minDate={new Date()}
              />
              <div class="topRow">
                <ul class="times">
                  <li>09:00-12:00</li>
                  <li>12:00-15:00</li>
                  <li>15:00-18:00</li>
                  <li>18:00-21:00</li>
                </ul>
                <ul class="tempAndRain">
                  <li>temp | rain</li>
                  <li>temp | rain</li>
                  <li>temp | rain</li>
                  <li>temp | rain</li>
                </ul>
              </div>

              {dayWeather.map((location, i) => (
                <ul style={{ marginBottom: "10px" }}>
                  <h2>{locations[i].name}</h2>
                  {location.map((hour, z) => (
                    <>
                      <li>rain {parseInt(hour.pop * 10) + "%"}</li>
                      <li>temp {hour.main.temp}</li>
                    </>
                  ))}
                </ul>
              ))}
            </div>
            <div class="climber">
              <img src={climber} alt="female climber on rocks" />
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </>
  );
}

export default App;
