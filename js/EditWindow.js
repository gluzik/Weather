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