
import env from "react-dotenv";
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import axios from 'axios';

const GetCapitalWeather = ({ capital }) => {
    const [weatherdata, setWeatherdata] = useState({});
    let weathericon = '', imgsrc = '';


    useEffect(() => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${env.REACT_APP_WEATHER_API_KEY}&units=metric`;
        axios.get(url).then(resp => setWeatherdata(resp.data));
    }, [capital]);

    if (Object.keys(weatherdata).length !== 0) {
        weathericon = weatherdata.weather[0].icon;
        imgsrc = `http://openweathermap.org/img/wn/${weathericon}@2x.png`;
        return <>
            <h3>Weather in {capital}</h3>
            temperature {weatherdata.main.temp + ' Celsius'} <br />
            <img src={imgsrc} alt="weather icon" /> < br />
            wind {weatherdata.wind.speed + ' m/s'}< br />
        </>
    } else
        return <></>
}


const CountryBasicData = ({ countries }) => {
    return countries.map(country => <div key={nanoid()}>
        <h2>{country.name.common}</h2><br />
        capital {country.capital.map(cap => <span key={nanoid()} > {cap + ' '}</span>)} <br />
        area {country.area}<br />
        <h3>languages</h3>
        <ul>
            {Object.values(country.languages).map(lang => <li key={nanoid()}>{lang} </li>)}<br />
        </ul>
        <img src={country.flags['png']} alt="country flag" />
        <GetCapitalWeather capital={country.capital[0]} />
    </div >)

}


export default CountryBasicData;
