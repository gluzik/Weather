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

            date.innerHTML = CurentCity.setDate(data[i].date +" 00:00");
            date.classList.add("forecast-date");
            li.append(date);

            li.classList.add("forecast-day");

            this.forecastOutput.append(li);
        }
    }
}