function loadDateAll() {
    setTimeout(() => {
        curentCity.setData()
        place.output(curentCity)
        forecast.createElementsForecast(curentCity.forecast.forecastday)
        hourlyForecast.showHours(curentCity.forecast.forecastday[0].hour)
        search.clearLine();
    }, 1000)
}