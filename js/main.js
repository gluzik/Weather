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
        this.time = CurentCity.setTime(this.location.localtime);
        this.date = CurentCity.setDate(this.location.localtime);
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

    searchCity(input, output) {
        if (input !== "") {
            this.searchApi = `http://api.weatherapi.com/v1/search.json?key=227dd7983d814751987210757232012&q=${input}`

            fetch(this.searchApi)
                .then(reference => reference.json())
                .then(json => {
                    this.searchArr = json;
                });

            setTimeout(() => {
                output.innerHTML = "";

                this.searchArr.forEach(option => {
                    let li = document.createElement("li");
                    li.classList.add("header__bar-options-city");
                    li.innerHTML = `${option.name}, ${option.country}`;
                    li.addEventListener("click", () => {
                        this.setCurrentCity(option.name);
                        this.loadDate();
                        loadDateAll();
                        output.innerHTML = "";
                    })

                    output.append(li);
                })
            }, 500)
        }
    }


    static setDate(dayDate) {
        let currentDate = dayDate.split(" ");

        let date = new Date(currentDate);
        let weekDay = new Intl.DateTimeFormat('en-US', { weekday: "long" }).format(date);
        let monthShort = new Intl.DateTimeFormat('en-US', { month: "short" }).format(date);
        let dateNumbers = new Intl.DateTimeFormat('en-US', { day: "numeric" }).format(date);

        return `${weekDay}, ${dateNumbers} ${monthShort}`;
    }

    static setTime(dayTime) {
        let time = dayTime.split(" ");
        return time[1];
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
        for (let i = 1; i < data.length; i++) {
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

            date.innerHTML = CurentCity.setDate(data[i].date);
            date.classList.add("forecast-date");
            li.append(date);

            li.classList.add("forecast-day");

            this.forecastOutput.append(li);
        }
    }
}

class HourlyForecast {
    items = [];

    constructor(hourlyList) {
        this.hourlyuOutput = hourlyList;
    }

    showHours(data) {
        this.hourlyuOutput.innerHTML = '';
        this.items = [];

        for (let i = 0; i < data.length; i++) {
            let li = document.createElement("li");
            let hours = document.createElement("div");
            let weatherIcon = document.createElement("img");
            let hoursTemp = document.createElement("div");
            let compasIcon = document.createElement("img");
            let windSpeed = document.createElement("div");

            li.classList.add("hours-item")

            hours.innerHTML = CurentCity.setTime(data[i].time);
            hours.classList.add("hours-time");

            weatherIcon.setAttribute("src", data[i].condition.icon);
            weatherIcon.setAttribute("alt", "icon");

            hoursTemp.innerHTML = data[i].temp_c + "°C";
            hoursTemp.classList.add("hours-temp");

            if (data[i].wind_dir === "W") {
                compasIcon.setAttribute("src", "img/temp/west.png");
            } else if (data[i].wind_dir === "WSW") {
                compasIcon.setAttribute("src", "img/temp/WSW.png");
            } else if (data[i].wind_dir === "WNW") {
                compasIcon.setAttribute("src", "img/temp/WNW.png");
            } else {
                compasIcon.setAttribute("src", "img/temp/west.png");
            }

            compasIcon.setAttribute("alt", "commpas");
            compasIcon.width = "55";

            windSpeed.innerHTML = data[i].wind_kph + 'km/h';
            windSpeed.classList.add("hours-wind");

            li.append(hours);
            li.append(weatherIcon);
            li.append(hoursTemp);
            li.append(compasIcon);
            li.append(windSpeed);

            this.hourlyuOutput.append(li);
            this.items.push(li);
        }
    }

    sliderItem() {
        this.buttonLeft = document.querySelector('#arrow-left');
        this.buttonRight = document.querySelector('#arrow-right');
        this.move = 0;

        this.buttonRight.addEventListener('click', () => {
            if (this.move <= -3300) return;

            this.move = this.move - 300;
            this.items.forEach(item => {
                item.style.left = `${this.move}px`;
            })

            if (this.move < 0) {
                this.buttonLeft.children[0].setAttribute("src", "img/arrow/arrow-left.png");
            }

            if (this.move === -3300) {
                this.buttonRight.children[0].setAttribute("src", "img/arrow/arrow-right-noactive.png");
            }
        })

        this.buttonLeft.addEventListener("click", () => {
            if (this.move >= 0) return;

            this.move = this.move + 300;
            this.items.forEach(item => {
                item.style.left = `${this.move}px`;
            })

            if (this.move === 0) {
                this.buttonLeft.children[0].setAttribute("src", "img/arrow/arrow-left-noactive.png");
            }

            if (this.move > -3300) {
                this.buttonRight.children[0].setAttribute("src", "img/arrow/arrow-right.png");
            }
        })
    }
}

class Cookies {
    valueCookie;

    constructor(keyCookie) {
        this.keyCookie = keyCookie;
    }

    getCookie() {
        let name_cook = this.keyCookie + "=";
        let spl = document.cookie.split(";");

        for (var i = 0; i < spl.length; i++) {

            let c = spl[i];

            while (c.charAt(0) == " ") {

                c = c.substring(1, c.length);

            }

            if (c.indexOf(name_cook) == 0) {

                let timeCookie = c.substring(name_cook.length, c.length);

                if (timeCookie === "" || timeCookie === undefined || timeCookie === "undefined") {
                    this.valueCookie = "Kyiv"
                } else {
                    this.value = timeCookie;
                }
            }
        }
    }

    setCookie(value) {
        document.cookie = `${this.keyCookie}=${value}`;
    }
}

class Search {
    constructor(searchInput, searchOutput, data) {
        this.searchLine = searchInput;
        this.outputList = searchOutput;
        this.data = data;

        this.focusSearch();
        this.inputSearch();
        this.keySearch();
        this.blueSearch();
    }

    clearLine() {
        this.searchLine.value = '';
    }

    blueSearch() {
        this.searchLine.addEventListener("blur", () => {
            setTimeout(() => {
                this.outputList.classList.add("header__bar-options-display")
            }, 500)
        })
    }

    focusSearch() {
        this.searchLine.addEventListener("focus", () => {
            this.outputList.classList.remove("header__bar-options-display");
        })
    }

    inputSearch() {
        this.searchLine.addEventListener("input", () => {
            if (this.searchLine.value !== "") {
                this.searchLine.classList.remove("header__bar-error");
                curentCity.searchCity(this.searchLine.value, this.outputList)
            } else {
                this.searchLine.classList.add("header__bar-error");
            }

        })
    }

    keySearch() {
        document.body.addEventListener("keyup", (e) => {
            if (e.code !== "Enter") return;
            if (this.searchLine.value !== "") {
                this.searchLine.classList.remove("header__bar-error");
                this.data.setCurrentCity(this.searchLine.value);
                this.data.loadDate();
                loadDateAll();
                this.searchLine.value = "";
                this.searchLine.blur();
                this.outputList.innerHTML = "";
            } else {
                this.searchLine.classList.add("header__bar-error");
            }
        })
    }
}

let searchInput = document.querySelector('#search-output');

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
let hourlyForecast = new HourlyForecast(document.querySelector('#hours-list'))

let search = new Search(
    document.querySelector('#search-input'),
    document.querySelector('#search-output'),
    curentCity
)






function loadDateAll() {
    setTimeout(() => {
        curentCity.setData()
        place.output(curentCity)
        forecast.createElementsForecast(curentCity.forecast.forecastday)
        hourlyForecast.showHours(curentCity.forecast.forecastday[0].hour)
        hourlyForecast.sliderItem();
        search.clearLine();
    }, 1000)
}



let cookie = new Cookies("currentLocation");

cookie.getCookie();
cookie.setCookie(undefined);

console.log(cookie.valueCookie)