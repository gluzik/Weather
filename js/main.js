let searchInput = document.querySelector('#search-output');
let curentCity = new CurentCity();
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
let forecast = new Forecast(document.querySelector('#forecast-list'))
let hourlyForecast = new HourlyForecast(document.querySelector('#hours-list'))
let search = new Search(
    document.querySelector('#search-input'),
    document.querySelector('#search-output'),
    curentCity
)

curentCity.findUserLocation()
curentCity.setCurrentCity("Kyiv")
curentCity.loadDate();
loadDateAll();

document.querySelector('#current-location').addEventListener('click', () => {
    curentCity.setCurrentCity(curentCity.userIp);
    curentCity.loadDate();
    loadDateAll();
})