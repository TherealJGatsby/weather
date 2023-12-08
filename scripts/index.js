document.addEventListener("DOMContentLoaded", () => {

    const cityList = document.getElementById("cityList");
    cityList.addEventListener("change", filterCities);

    // populate drownpdown.
    // 

    populateCities();
})

function populateCities() {
    const cityList = document.getElementById("cityList");

    // for (let city of cities) {

    //     // console.log(mountain)
    //     const option = new Option(city.name)
    //     cityList.appendChild(option)
    // }

    cities.forEach((city) => {
        const option = new Option(city.name)
        cityList.appendChild(option)
    })
}

async function filterCities() {
    const citySelected = document.getElementById("cityList").value;

    let city = cities.find((city) => {
        return citySelected == city.name

    })

    let stationLookupUrl =
        `https://api.weather.gov/points/${city.latitude},${city.longitude}`;

    const response = await fetch(stationLookupUrl)
    const data = await response.json()

    console.log(data);

    let weatherUrl = data.properties.forecast;
    getWeather(weatherUrl)
}

async function getWeather(weatherUrl) {
    const response = await fetch(weatherUrl)
    const data = await response.json()

    let forecastArray = data.properties.periods;
    displayWeather(forecastArray);
}

function displayWeather(forecastArray) {
    const weatherContainer = document.getElementById("cityName");
  
    weatherContainer.innerHTML = "";
  
    forecastArray.forEach((forecast) => {
      const weatherForecast = document.createElement("p");
      weatherForecast.innerText = `${forecast.name}: Temperature ${forecast.temperature} ${forecast.temperatureUnit}  Winds ${forecast.windDirection} ${forecast.windDirection}   ${forecast.shortForecast}`;
      weatherContainer.appendChild(weatherForecast);
      const breakElement = document.createElement("br");
      weatherContainer.appendChild(breakElement);
    });
  }


