class CurentCity {
    currentApi = '';
    location;
    current;
    forecast;

    setCurrentCity(city) {
        this.currentApi = `http://api.weatherapi.com/v1/forecast.json?key=227dd7983d814751987210757232012&q=${city}&days=6&aqi=no&alerts=no`;
    }

    loadDate() {
        if (this.currentApi !== '') {
            fetch(this.currentApi)
                .then(reference => reference.json())
                .then(json => {
                    this.location = json.location;
                    this.current = json.current;
                    this.forecast = json.forecast;
                    console.log(json)
                })
        }
    }

    setData() {
        this.city = this.location.name;
        this.setTime();
        this.date = this.setDate(this.location.localtime);
        this.temp = this.current.temp_c;
        this.feelsLike = this.current.feelslike_c;
        this.sunrise = this.forecast.forecastday[0].astro.sunrise;
        this.sunset = this.forecast.forecastday[0].astro.sunset;
        this.weatherIcon = this.current.condition.icon;
        this.weatherText = this.current.condition.text;
        this.humidity = this.current.humidity;
        this.windSpeed = this.current.wind_kph;
        this.pressure = this.current.pressure_mb;
        this.uv = this.current.uv;
    }

    setDate(dayDate) {
        let currentDate = dayDate.split(" ");

        let date = new Date(currentDate);
        let weekDay = new Intl.DateTimeFormat('en-US', { weekday: "long" }).format(date);
        let monthShort = new Intl.DateTimeFormat('en-US', { month: "short" }).format(date);
        let dateNumbers = new Intl.DateTimeFormat('en-US', { day: "numeric" }).format(date);

        return `${weekDay}, ${dateNumbers} ${monthShort}`;
    }

    setTime () {
        let time = this.location.localtime.split(" ");
        this.time = time[1];
    }
}

class EditWindow {
    constructor(city, time, date, temp, feelsLike, sunrise, sunset, weatherIcon, weatherText, humidity, windSpeed, pressure, uv) {
        this.city = city;
        this.time = time;
        this.date = date;
        this.temp = temp;
        this.feelsLike = feelsLike;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.weatherIcon = weatherIcon;
        this.weatherText = weatherText;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.pressure = pressure;
        this.uv = uv;
    }

    output(data) {
        this.city.innerHTML = data.city;
        this.time.innerHTML = data.time;
        this.date.innerHTML = data.date;
        this.temp.innerHTML = data.temp;
        this.feelsLike.innerHTML = data.feelsLike;
        this.sunrise.innerHTML = data.sunrise;
        this.sunset.innerHTML = data.sunset;
        this.editImages(data.weatherIcon);
        this.weatherText.innerHTML = data.weatherText;
        this.humidity.innerHTML = data.humidity;
        this.windSpeed.innerHTML = data.windSpeed;
        this.pressure.innerHTML = data.pressure;
        this.uv.innerHTML = data.uv;
    }

    editImages(images) {
        this.weatherIcon.setAttribute("src", images);
    }
}

class Forecast {
    constructor(forecastList) {
        this.forecastOutput = forecastList;
    }

    createElementsForecast(data) {
        this.forecastOutput.innerHTML = '';
        for(let i = 1; i < data.length; i++) {
            let li = document.createElement("li");
            let img = document.createElement("img");
            let temp = document.createElement('div');
            let date = document.createElement('div');

            img.setAttribute("src", data[i].day.condition.icon);
            img.setAttribute("alt", "icon");
            li.append(img);

            temp.innerHTML = `${data[i].day.avgtemp_c}°C`;
            temp.classList.add("forecast-temp");
            li.append(temp);

            date.innerHTML = curentCity.setDate(data[i].date);
            date.classList.add("forecast-date");
            li.append(date);

            li.classList.add("forecast-day");

            this.forecastOutput.append(li);
        }
    }
}

let curentCity = new CurentCity();
curentCity.setCurrentCity("Bydgoszcz")

let place = new EditWindow(
    document.querySelector('#city'),
    document.querySelector('#clock'),
    document.querySelector('#date'),
    document.querySelector('#temp'),
    document.querySelector('#temp-fellike'),
    document.querySelector('#sunrise'),
    document.querySelector('#sunset'),
    document.querySelector('#images-output'),
    document.querySelector('#weather-text'),
    document.querySelector('#humidity'),
    document.querySelector('#wind'),
    document.querySelector('#pressure'),
    document.querySelector('#uv')
)
curentCity.loadDate();

let forecast = new Forecast(document.querySelector('#forecast-list'))

setTimeout(() => {
    curentCity.setData()
    place.output(curentCity)
    forecast.createElementsForecast(curentCity.forecast.forecastday)
    console.log(curentCity.forecast)
}, 1000)
