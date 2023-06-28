// need location

var searchButton = $("#search-button");
var apiKey = "dab947fed8047b6c620cec62fe4fded5";
var dailyURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=`;
var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=`;
var dailyWeatherEl = $("#daily-weather");

async function submitSearch(event) {
  event.preventDefault();
  var userInput = $("#search-form").val();
  await dailyWeather(userInput);
  //   await forecast(userInput);
  //   console.log(userInput);
}

async function dailyWeather(city) {
  dailyWeatherEl.empty();
  var response = await $.ajax({
    url: dailyURL + city,
    type: "GET",
  });
  //   console.log(response);
  var template = `<div class="card">
    <div class="card-body">
    <h4 class="card-title">
    ${response.weather[0].description} in ${city} <img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png" alt="${response.weather[0].description}" /> today!
    </h4>
    <p class="card-text">Temperature: ${response.main.temp} F</p>
    <p class="card-text">Humidity: ${response.main.humidity} %</p>
    <p class="card-text">Windspeed: ${response.wind.speed} mph</p>
    </div>
    </div>`;
  dailyWeatherEl.append(template);
  await forecast(city);
  // ^^^ turn back on when working on forecast
}

// will need 5
async function forecast(city) {
  var response = await $.ajax({
    url: forecastURL + city,
    type: "GET",
  });
  console.log(response);
  var template = `<div class=card>
  
  <div class=card-body>
  <h4>5-Day Forecast</h4>

  <h5 class=card-title>Day 1<img src="http://openweathermap.org/img/w/${response.list[4].weather[0].icon}.png" alt="${response.list[4].weather[0].description}" /> ${response.list[4].weather[0].description}
  </h5>
  <p class="card-text">Temperature: ${response.list[4].main.temp} F</p>
  <p class="card-text">Humidity: ${response.list[4].main.humidity} %</p>
  <p class="card-text">Windspeed: ${response.list[4].wind.speed} mph</p>
  </div>
  
  <h5 class=card-title>Day 2<img src="http://openweathermap.org/img/w/${response.list[12].weather[0].icon}.png" alt="${response.list[12].weather[0].description}" /> ${response.list[12].weather[0].description}
  </h5>
  <p class="card-text">Temperature: ${response.list[12].main.temp} F</p>
  <p class="card-text">Humidity: ${response.list[12].main.humidity} %</p>
  <p class="card-text">Windspeed: ${response.list[12].wind.speed} mph</p>
  </div>

  <h5 class=card-title>Day 3<img src="http://openweathermap.org/img/w/${response.list[20].weather[0].icon}.png" alt="${response.list[20].weather[0].description}" /> ${response.list[20].weather[0].description}
  </h5>
  <p class="card-text">Temperature: ${response.list[20].main.temp} F</p>
  <p class="card-text">Humidity: ${response.list[20].main.humidity} %</p>
  <p class="card-text">Windspeed: ${response.list[20].wind.speed} mph</p>
  </div>

  <h5 class=card-title>Day 4<img src="http://openweathermap.org/img/w/${response.list[28].weather[0].icon}.png" alt="${response.list[28].weather[0].description}" /> ${response.list[28].weather[0].description}
  </h5>
  <p class="card-text">Temperature: ${response.list[28].main.temp} F</p>
  <p class="card-text">Humidity: ${response.list[28].main.humidity} %</p>
  <p class="card-text">Windspeed: ${response.list[28].wind.speed} mph</p>
  </div>
  
  <h5 class=card-title>Day 5<img src="http://openweathermap.org/img/w/${response.list[36].weather[0].icon}.png" alt="${response.list[36].weather[0].description}" /> ${response.list[36].weather[0].description}
  </h5>
  <p class="card-text">Temperature: ${response.list[36].main.temp} F</p>
  <p class="card-text">Humidity: ${response.list[36].main.humidity} %</p>
  <p class="card-text">Windspeed: ${response.list[36].wind.speed} mph</p>
  </div>`;
  dailyWeatherEl.append(template);
}

//
searchButton.on("click", submitSearch);
