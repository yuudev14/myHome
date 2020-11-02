import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { MYHOME } from '../context/myHomeData';

const Main = () => {
    const {myHome} = useContext(MYHOME);



    const [dates, setDates] = useState(Date.now);   
    const [location, setLocation] = useState({
        lat : 0,
        lon : 0
    });
    const [currentWeather, setCurrentWeather] = useState({})
    const [forecast, setForecast] = useState([]);
    const [quote, setQuote] = useState({});
    

    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                let lon = position.coords.longitude;
                let lat = position.coords.latitude;
                setLocation({
                    lon,
                    lat
                })
            })
        }
        const time = setInterval(() => {
            setDates(Date.now)
        }, 1000);

        return () => {
            clearInterval(time)
        }
    },[])

    useEffect(() => {
        let count = 1000;
        const weather = setInterval(() => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=80595e901e5bb1c00132ed60b6c729b0`)
                .then(res => {
                    setCurrentWeather(res.data);
                });
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=80595e901e5bb1c00132ed60b6c729b0`)
                .then(res => {
                    let forecastList = res.data.list.filter(list => new Date(list.dt_txt).getDate() !== date && new Date(list.dt_txt).getHours() === 12)
                    setForecast(forecastList);
                });
            axios.get('https://quotes.rest/qod.json')
                .then(res => setQuote(res.data.contents.quotes[0]));

        }, count);
        return () => clearInterval(weather)
    },[location])

    
    function getDate(time){
        return new Date(time)
    }

    const monthLists = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const dayLists = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let hour = getDate(dates).getHours();
    let minutes = getDate(dates).getMinutes();
    let seconds = getDate(dates).getSeconds();
    hour = hour >= 10 ? hour : `0${hour}`;
    minutes = minutes >= 10 ? minutes : `0${minutes}`;
    seconds = seconds >= 10 ? seconds : `0${seconds}`;
    let month = monthLists[getDate(dates).getMonth()]
    let day = dayLists[getDate(dates).getDay()]
    let date = getDate(dates).getDate();

    return (  
        <section className='main_section'>
            <div className='main_container'>
                <div className='date'>
                    <h3>{day}, {month} {date}</h3>
                </div>
                
                <div className='time'>
                    <h1>{hour}:{minutes}</h1>
                    <span className='seconds'> {seconds}</span>
                </div>
                <div className='intro'>
                    <h2>{hour >= 0 && hour < 12 ? 'Good Morning' : hour >= 12 && hour < 18 ? 'Good Afternoon' : 'Good Evening'} {myHome.user}</h2>
                </div>
                <div className='weather'>
                    <p>{currentWeather.name} - <span  className='temp'>{currentWeather.main && Math.floor(currentWeather.main.temp - 273.15) + '°C'}</span></p>
                    {currentWeather.weather && (
                        <div className='hover'>
                            Hover to show forecast
                            <ul>
                                <li className='currentWeather'>
                                        <h3>{currentWeather.main && `${day.slice(0,3)}`}</h3>
                                        <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`} />
                                        <p className='max'>{currentWeather.main && Math.floor(currentWeather.main.temp_max - 273.15) + '°C'}</p>
                                        <p className='min'>{currentWeather.main && Math.floor(currentWeather.main.temp_min - 273.15) + '°C'}</p>
                                </li>
                                {forecast.length > 0 && forecast.map((list, i) => (
                                    
                                    <li key={i}>
                                        <h4>{list.main && `${dayLists[new Date(list.dt_txt).getDay()].slice(0,3)}`}</h4>
                                        <img src={`https://openweathermap.org/img/wn/${list.weather[0].icon}.png`} />
                                        <p className='max'>{list.main && Math.floor(list.main.temp_max - 273.15) + '°C'}</p>
                                        <p className='min'>{list.main && Math.floor(list.main.temp_min - 273.15) + '°C'}</p>
                                    </li>
                                    //asas
                                ))}
                            </ul>
                        </div>)
                    }
                    
                </div>
                <div className='quote'>
                {quote.length > 0 && (<h4>{`"${ quote.quote} - ${quote.author}"`}</h4>)}
                    
                </div>

            </div>

        </section>
    );
}
 
export default Main;