import "./App.scss";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import mapIreland from "./images/mapIreland.png";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

function App() {
  let maxDate = new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000);
  let minDate = new Date(maxDate.getTime() - 3 * 24 * 60 * 60 * 1000);
  const [value, setDate] = useState(minDate);
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
    {
      name: "Fair Head",
      boulders: 511,
      county: "Antrim",
      latitude: 55.22677471226471,
      longitude: -6.147370655469292,
    },
    {
      name: "Gap of Dunloe",
      boulders: 40,
      county: "Kerry",
      latitude: 52.02456913909303,
      longitude: -9.636417840550271,
    },
    {
      name: "Glendalough",
      boulders: 219,
      county: "Wicklow",
      latitude: 53.00659217097069,
      longitude: -6.382179534789128,
    },
    {
      name: "Inishowen",
      boulders: 100,
      county: "Donegal",
      latitude: 55.361620632926325,
      longitude: -7.294088557516704,
    },
    {
      name: "Mourne",
      boulders: 100,
      county: "Down",
      latitude: 54.157742111287604,
      longitude: -6.092829351171304,
    },
    {
      name: "Portrane",
      boulders: 67,
      county: "Dublin",
      latitude: 53.4877134928144,
      longitude: -6.1000056353936065,
    },
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
      <main>
        <div class="shade absolute"></div>
        <div class="greenblock absolute">
          <h3>Discover Ireland's wildest climbing spots</h3>
        </div>
        <section class="absolute">
          <h1>out</h1>
          <h2>bouldering</h2>
        </section>
      </main>
      <div class="allMapContent">
        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
          <div class="mapText">
            <p>
              Ireland is known for its diverse and untamed landscape and is home
              to some of the most amazing climbs out in nature. Although the
              Atlantic ocean provides a mild climate, the weather on the island
              is changeable and it often rains. Use the chart below to get a
              swift overview of the weather forecast at the most popular
              bouldering locations and plan your ideal (dry!) climbing trip.
            </p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
          <div class="map">
            <img
              src={mapIreland}
              alt="A map of Ireland with the most popular climbing locations highlighted."
            />
          </div>
        </ScrollAnimation>
      </div>
      <div class="weather">
        <div class="weatherChart">
          <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
            <div class="datePicker">
              <DatePicker
                value={value}
                onChange={setDate}
                maxDate={maxDate}
                minDate={minDate}
              />
            </div>
            <div class="row topRow">
              <div class="firstCol"></div>
              <div class="topCell cell">
                <div class="cellContent">
                  <div>09:00-12:00</div>
                  <div>temp | rain</div>
                </div>
              </div>
              <div class="topCell cell">
                <div class="cellContent">
                  <div>12:00-15:00</div>
                  <div>temp | rain</div>
                </div>
              </div>
              <div class="topCell cell">
                <div class="cellContent">
                  <div>15:00-18:00</div>
                  <div>temp | rain</div>
                </div>
              </div>
              <div class="topCell cell">
                <div class="cellContent">
                  <div>18:00-21:00</div>
                  <div>temp | rain</div>
                </div>
              </div>
            </div>
            {dayWeather.map((location, i) => (
              <div class="row locationDataAll">
                <div class="firstCol locationName">
                  <div>{locations[i].name}</div>
                </div>
                {location.map((hour, z) => (
                  <div class="cell">
                    <div class="cellContent">
                      {/* {parseInt(hour.main.temp) + "°C " + " | "}*/}20°C |
                      {/* {+parseInt(hour.pop * 10) + "%"} */} 100%
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </ScrollAnimation>
        </div>
      </div>
    </>
  );
}

export default App;
