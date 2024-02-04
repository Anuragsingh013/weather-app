import React from 'react';
import './weatherData.css';
import humidityImage from './assets/images/humidity.png';
import windImage from './assets/images/wind.png'


const WeatherData = ({ temp,city, humidity,windSpeed }) => {
    return (
        <div className='weatherData'>
            <div className="leftWeatherPart">
                {/* temperature */}
                <div className="temp">
                    <h1>{Math.floor(temp) + " ℃"}</h1>
                </div>
                {/* location */}
                <div className="countryName">
                <h1>{city.charAt(0).toUpperCase() + city.slice(1)}</h1>
                </div>
            </div>
            <div className="rightWeatherPart">
                {/* humidity */}
                <div className="humidity">
                    <img src={humidityImage} alt="humidity" />
                    <div className="data">
                        <h1>{humidity+" %"}</h1>
                        <h1>Humidity</h1>
                    </div>
                </div>
                {/* windspeed */}
                <div className="windSpeed">
                    <img src={windImage} alt="humidity" />
                    <div className="data">
                        <h1>{windSpeed+" Km/h"}</h1>
                        <h1>Wind</h1>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default WeatherData;
