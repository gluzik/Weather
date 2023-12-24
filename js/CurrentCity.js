class CurentCity {
    currentApi = '';
    location;
    current;
    forecast;

    setCurrentCity(city) {
        this.currentApi = `https://api.weatherapi.com/v1/forecast.json?key=227dd7983d814751987210757232012&q=${city}&days=6&aqi=no&alerts=no`;
    }

    loadDate() {
        if (this.currentApi !== '') {
            fetch(this.currentApi)
                .then(reference => reference.json())
                .then(json => {
                    if (json.error === undefined) {
                        this.location = json.location;
                        this.current = json.current;
                        this.forecast = json.forecast;
                    } else {
                        alert(json.error.message)
                        this.setCurrentCity("kyiv");
                        this.loadDate()
                        loadDateAll();
                    }
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
            this.searchApi = `https://api.weatherapi.com/v1/search.json?key=227dd7983d814751987210757232012&q=${input}`

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

    findUserLocation() {
        setTimeout(() => {
            fetch('https://ipapi.co/json/')
                .then(d => d.json())
                .then(d => {
                    this.userIp = d.ip;
                    // this.setCurrentCity(d.ip);
                    // this.loadDate();
                    // loadDateAll();
                })
                .catch(error => {
                });
        }, 2000)
    }

    static setDate(dayDate) {
        // let currentDate = dayDate.split(" ");

        // let date = new Date(currentDate);
        // let weekDay = new Intl.DateTimeFormat('en-US', { weekday: "long" }).format(date);
        // let monthShort = new Intl.DateTimeFormat('en-US', { month: "short" }).format(date);
        // let dateNumbers = new Intl.DateTimeFormat('en-US', { day: "numeric" }).format(date);

        // return `${weekDay}, ${dateNumbers} ${monthShort}`;
        // return `Tuesday, 23 Aug`
        let currentDate = dayDate.split(" ");

        // Extract date components
        let [datePart, timePart] = currentDate;
        let [year, month, day] = datePart.split("-");
        let [hours, minutes] = timePart.split(":");

        // Create Date object
        let date = new Date(year, month - 1, day, hours, minutes);

        // Format the date
        let weekDay = new Intl.DateTimeFormat('en-US', { weekday: "long" }).format(date);
        let monthShort = new Intl.DateTimeFormat('en-US', { month: "short" }).format(date);
        let dateNumbers = new Intl.DateTimeFormat('en-US', { day: "numeric" }).format(date);

        console.log(`${weekDay}, ${dateNumbers} ${monthShort}`)
        return `${weekDay}, ${dateNumbers} ${monthShort}`;
    }

    static setTime(dayTime) {
        let time = dayTime.split(" ");
        return time[1];
    }
}