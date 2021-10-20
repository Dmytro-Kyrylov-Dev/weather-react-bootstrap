import { useEffect, useState } from 'react';
import useGeoLocation from './customHooks/useGeoLocation';
import './App.css';
import Weather from './components/Weather';
import GeoLocationError from './components/GeoLocationError';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

function App() {
  const { error, data: { latitude, longitude } } = useGeoLocation();
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [woeid, setWoeid] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherImg, setWeatherImg] = useState("");
  const [color, setColor] = useState('white');

  useEffect(() => {
    getWoeidByCurrentLocation(latitude, longitude);
    getDataByWoeid(woeid);
  }, [latitude, longitude, woeid]);

  const getDataByWoeid = (woeid) => {
    woeid && fetch(`https://thingproxy.freeboard.io/fetch/https://www.metaweather.com/api/location/${woeid}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setWeather(data);
        setWeatherImg(`https://www.metaweather.com/static/img/weather/png/64/${data.consolidated_weather[0].weather_state_abbr}.png`);
        const temp = data.consolidated_weather[0].the_temp;
        if (temp < 0) {
          setColor('#66b3ff');
        } else if (temp > 0 && temp < 10) {
          setColor('#00ffbb');
        } else if (temp > 10 && temp < 15) {
          setColor('#fff700');
        } else if (temp > 15) {
          setColor('#ff8c00');
        }
      })
  };

  const getWoeidByCurrentLocation = (latitude, longitude) => {
    latitude && longitude && fetch(`https://thingproxy.freeboard.io/fetch/https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        const woeid = data[0].woeid;
        setWoeid(woeid);
      })
  };

  const doSearch = (search) => {
    fetch(`https://thingproxy.freeboard.io/fetch/https://www.metaweather.com/api/location/search/?query=${search}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        // correct city name in search field
        if (data.length === 0) {
          return;
        } else {
          const woeid = data[0].woeid;
          getDataByWoeid(woeid);
        }
      })
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (city) {
      setSearch(city);
      doSearch(city);
      setCity("");
    }
  }

  return (
    <div className="App" style={{backgroundColor: `${color}`}}>
      <div className="contain-wrap">
        <div className="main-container">
          <Form onSubmit={onSubmit}>
              <InputGroup className="mb-3">
                <FormControl type="text" placeholder="Search by the city..." value={city} onChange={(e) => setCity(e.target.value)}/>
                <Button type="submit">Search</Button>
              </InputGroup>
          </Form>
          {!weather && error && <GeoLocationError error={error} />}
          {weather && <Weather weather={weather} weatherImg={weatherImg} />}
        </div>
      </div>
    </div>
  );
}

export default App;