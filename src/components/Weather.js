export default function Weather({ weather, weatherImg }) {
    const city = weather.title;
    const country = weather.parent.title;
    const sky = weather.consolidated_weather[0].weather_state_name;
    const temp = weather.consolidated_weather[0].the_temp.toFixed();
    return(
        <div className="weather-info">
            <h1>Weather Today</h1>
            <img src={weatherImg} alt="weather" />
            <div>{sky}</div>
            <div>{city} City, {country}</div>
            <div className="weather-info-temp">{temp} &deg;C</div>
        </div>
    );
}