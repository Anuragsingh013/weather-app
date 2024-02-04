import React, { useEffect, useRef, useState } from 'react';
import WeatherData from './WeatherData';
import clear from './assets/images/clear.png'
import search from './assets/images/search.png'
import clouds from './assets/images/clouds.png'
import drizzle from './assets/images/drizzle.png'
import rain from './assets/images/rain.png'
import humidity_icon from './assets/images/humidity.png'
import wind from './assets/images/wind.png'
import mist from './assets/images/mist.png'
import snow from './assets/images/snow.png'
import './TopBar.css'

const TopBar = () => {
    const [temperature, setTemperature] = useState("");
    const [cityName, setCityName] = useState("ghaziabad");
    const [windSpeed, setWindSpeed] = useState("");
    const [humidity, setHumidity] = useState("");
    const [wicon, setWicon] = useState(clouds);
    const inputRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, [cityName]);

    const API_KEY = 'a1860d3e4d5e4cda9a99bf205a710728';

    function fetchData() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
            .then((res) => res.json())
            .then((data) => {
                
                setTemperature(data.main.temp);
                setHumidity(data.main.humidity);
                setCityName(data.name);
                setWindSpeed(data.wind.speed);
                if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
                    setWicon(clear);
                } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
                    setWicon(clouds);
                } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '04n') {
                    setWicon(drizzle);
                } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
                    setWicon(humidity_icon);
                } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
                    setWicon(rain);
                } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
                    setWicon(rain);
                } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
                    setWicon(snow);
                } else {
                    setWicon(clear);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    let searchTimeout;

    function handleChange(e) {
        // Clear the previous timeout
        clearTimeout(searchTimeout);

        // Set a new timeout to trigger search after 500 milliseconds (adjust as needed)
        searchTimeout = setTimeout(() => {
            setCityName(e.target.value);
            fetchData();
        }, 1000);
    }
    

    function handleSearchClick() {
        fetchData();
    }

    return (
        <div>
            <div className="topBar">
                <div className="leftPart">
                    <img src={wicon} alt="Weather Icon" />
                </div>
                <div className="rightPart">
                    <input type="text" placeholder='Search' onChange={handleChange} />
                    <div className="searchIcon" onClick={handleSearchClick}>
                        <img src={search} alt="Search Icon" />
                    </div>
                </div>
            </div>
            {temperature !== "" && <WeatherData temp={temperature} city={cityName} humidity={humidity} windSpeed={windSpeed} />}
        </div>
    );
};

export default TopBar;
