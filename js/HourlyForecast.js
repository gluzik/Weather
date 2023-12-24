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