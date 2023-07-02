//
// QUERY SELECTORS
// QUERY SELECTORS
// QUERY SELECTORS
var searchButton = $("#search-button");
var dailyWeatherEl = $("#daily-weather");

// from openweather
var apiKey = "dab947fed8047b6c620cec62fe4fded5";

// retrieves informtation from open weather, plugs in api key from openweather
var dailyURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=`;
var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=`;

//
// FUNCTIONS
// FUNCTIONS
// FUNCTIONS

// WEATHER FUNCTIONALITIES
async function submitSearch(event) {
  event.preventDefault();
  var userInput = $("#search-form").val();
  await dailyWeather(userInput);
  await saveSearch(userInput);
  await renderSavedCities(userInput);
  //   console.log(userInput);
}

async function dailyWeather(city) {
  dailyWeatherEl.empty();
  var response = await $.ajax({
    url: dailyURL + city,
    type: "GET",
  });
  //   console.log(response);

  //   appended daily weather
  //   lists current temp, humidty, windspeed in searched city
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

  // places daily/current weather info in document
  dailyWeatherEl.append(template);

  // triggers forecast data to run
  await forecast(city);
}

async function forecast(city) {
  var response = await $.ajax({
    url: forecastURL + city,
    type: "GET",
  });
  // console.log(response);

  //   appended 5-day forecast
  //   list projected temp, humidty, windspeed at noon from tomorrow's subjective date and the following 4 days in searched city
  var template = `<div class=card>
  
  <div class=card-body>
  <h4>5-Day Forecast</h4>

  <h5 class=card-title>${response.list[4].dt_txt}<img src="http://openweathermap.org/img/w/${response.list[4].weather[0].icon}.png" alt="${response.list[4].weather[0].description}" /> ${response.list[4].weather[0].description}
  </h5>
  <p class="card-text">Temperature: ${response.list[4].main.temp} F</p>
  <p class="card-text">Humidity: ${response.list[4].main.humidity} %</p>
  <p class="card-text">Windspeed: ${response.list[4].wind.speed} mph</p>
  </div>
  
  <h5 class=card-title>${response.list[12].dt_txt}<img src="http://openweathermap.org/img/w/${response.list[12].weather[0].icon}.png" alt="${response.list[12].weather[0].description}" /> ${response.list[12].weather[0].description}
  </h5>
  <p class="card-text">Temperature: ${response.list[12].main.temp} F</p>
  <p class="card-text">Humidity: ${response.list[12].main.humidity} %</p>
  <p class="card-text">Windspeed: ${response.list[12].wind.speed} mph</p>
  </div>

  <h5 class=card-title>${response.list[20].dt_txt}<img src="http://openweathermap.org/img/w/${response.list[20].weather[0].icon}.png" alt="${response.list[20].weather[0].description}" /> ${response.list[20].weather[0].description}
  </h5>
  <p class="card-text">Temperature: ${response.list[20].main.temp} F</p>
  <p class="card-text">Humidity: ${response.list[20].main.humidity} %</p>
  <p class="card-text">Windspeed: ${response.list[20].wind.speed} mph</p>
  </div>

  <h5 class=card-title>${response.list[28].dt_txt}<img src="http://openweathermap.org/img/w/${response.list[28].weather[0].icon}.png" alt="${response.list[28].weather[0].description}" /> ${response.list[28].weather[0].description}
  </h5>
  <p class="card-text">Temperature: ${response.list[28].main.temp} F</p>
  <p class="card-text">Humidity: ${response.list[28].main.humidity} %</p>
  <p class="card-text">Windspeed: ${response.list[28].wind.speed} mph</p>
  </div>
  
  <h5 class=card-title>${response.list[36].dt_txt}<img src="http://openweathermap.org/img/w/${response.list[36].weather[0].icon}.png" alt="${response.list[36].weather[0].description}" /> ${response.list[36].weather[0].description}
  </h5>
  <p class="card-text">Temperature: ${response.list[36].main.temp} F</p>
  <p class="card-text">Humidity: ${response.list[36].main.humidity} %</p>
  <p class="card-text">Windspeed: ${response.list[36].wind.speed} mph</p>
  </div>`;

  //   places 5-day forecast template in document
  dailyWeatherEl.append(template);
}

// SEARCH FUNCTIONALITIES
function saveSearch(userInput) {
  var historyEl = $("#search-history");
  var liEl = $("<li>");
  liEl.addClass("list-group-item");
  liEl.text(userInput);
  historyEl.append(liEl);

  // Retrieve existing search history from local storage
  var searchHistory = JSON.parse(localStorage.getItem("searchedCity")) || [];

  // Add the new search value to the history
  searchHistory.push(userInput);

  // Save the updated history back to local storage
  localStorage.setItem("searchedCity", JSON.stringify(searchHistory));
}

// render unordered list of cities to the page
function renderSavedCities() {
  var searchHistoryEl = $("#search-history");
  searchHistoryEl.empty();
  var searchHistory = JSON.parse(localStorage.getItem("searchedCity")) || [];
  for (var i = 0; i < searchHistory.length; i++) {
    var liEl = $("<li>");
    liEl.addClass("list-group-item");
    liEl.text(searchHistory[i]);
    // event listener for city list items displayed to the page
    liEl.on("click", function () {
      var selectedCity = $(this).text();
      dailyWeather(selectedCity);
    });
    searchHistoryEl.append(liEl);
  }
}

//
// EVENT LISTENER(S)
// EVENT LISTENER(S)
// EVENT LISTENER(S)
searchButton.on("click", submitSearch);

//
// FUNCTION CALLS
// FUNCTION CALLS
// FUNCTION CALLS
renderSavedCities();
