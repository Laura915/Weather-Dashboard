//Click Func
$("#button-addon2").on("click", function (event) {
    event.preventDefault();

    clearPreviousResponse();
    
    //when submit btn clicked, grab city value 
    var cityName = $("#city-input").val();
    var firstQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=7cc39e7154aa87bb1a0a379166176004";

    $.ajax({
        url: firstQueryURL,
        method: "GET"
    }).then(function (response01) {
        //set cityLat & cityLon
        searchCityLon = response01.coord.lon;
        searchCityLat = response01.coord.lat;
        //weathericon
        var searchWeatherIconCurrentDay = response01.weather[0].icon;
        var weatherIconURLCurrentDay = "http://openweathermap.org/img/wn/" + searchWeatherIconCurrentDay + "@2x.png";
        //temp, convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
        var searchTempCurrentDay = ((response01.main.temp) - 273.15) * 1.80 + 32;
        var tempCurrentDay = searchTempCurrentDay.toString().slice(0, 4);
        //Humidity
        var searchHumidityCurrentDay = response01.main.humidity;
        var humidityCurrentDay = searchHumidityCurrentDay;
        //WindSpeed
        var searchWindSpeed = response01.wind.speed;
        var windSpeedCurrentDay = searchWindSpeed;

        getCoord(searchCityLon, searchCityLat).then(function (response02) {
            //UV index current day
            var searchUvIndex = response02.current.uvi;
            var uvIndexCurrentDay = searchUvIndex;

            currentWeatherDisplay(cityName, weatherIconURLCurrentDay, tempCurrentDay, humidityCurrentDay, windSpeedCurrentDay, uvIndexCurrentDay);

            forecastDaily(response02);

        });
    });
});

function getCoord(lon, lat) {
    var secondQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=7cc39e7154aa87bb1a0a379166176004";
    return $.ajax({
        url: secondQueryURL,
        method: "GET"
    })
}

function currentWeatherDisplay(cityName, weatherIconURLCurrentDay, tempCurrentDay, humidityCurrentDay, windSpeedCurrentDay, uvIndexCurrentDay) {
    // CityName 
    cityName = $("<p>").text(cityName);
    //date
    var currentDate = $("<p>").text((moment().format('l')));
    //weather icon
    var weatherIconCurrentDay = $("<img>").attr("src", weatherIconURLCurrentDay);
    //Temp
    temp = $("<p>").text("Temperature: " + tempCurrentDay + " °F");
    //humidity
    humidity = $("<p>").text("Humidity: " + humidityCurrentDay + " %");
    //Wind speed
    windSpeed = $("<p>").text("Wind Spped: " + windSpeedCurrentDay + " MPH");
    //append items
    var currentDayDiv = $("#current-day-box");
    currentDayDiv.append(cityName);
    currentDayDiv.append(currentDate);
    currentDayDiv.append(weatherIconCurrentDay);
    currentDayDiv.append(temp);
    currentDayDiv.append(windSpeed);

    //UV Index function
    uvIndexSetColor(uvIndexCurrentDay);
    function uvIndexSetColor(uvIndexCurrentDay) {
        if (uvIndexCurrentDay >= 1 && uvIndexCurrentDay < 3) {
            //low

        } else if (uvIndexCurrentDay >= 3 && uvIndexCurrentDay < 6) {
            //mod

        } else if (uvIndexCurrentDay >= 6 && uvIndexCurrentDay < 8) {
            //High 
            var uvIndexDiv = $("<div class='uv-high-index uv-box'>").text(uvIndexCurrentDay);
            var uvIndexP = $("<p>").text("UV Index: ");
            //append
            currentDayDiv.append(uvIndexP);
            currentDayDiv.append(uvIndexDiv);
        } else if (uvIndexCurrentDay >= 8 && uvIndexCurrentDay < 11) {
            //very high
        } else {
            //extreme 
        };
    };
};

function forecastDaily(response02) {
    
    //for loop to loop through daily
    for (var i = 1; i < 6; i++) {
        //date
        var dateForecast = moment().add(i, 'days').format('l');
        var dateForecastP = $("<p>").text(dateForecast);
        //icon
        var iconUrlForecast="http://openweathermap.org/img/wn/" + response02.daily[i].weather[0].icon + "@2x.png";
        var iconImgForescast=$("<img>").attr("src", iconUrlForecast);
        //temp
        var tempForecast=(((response02.daily[i].temp.day)- 273.15) * 1.80 + 32).toString().slice(0, 4);
        var tempP=$("<p>").text("Temperature: " + tempForecast + " °F");
        //humidity
        var humidityForecast=response02.daily[i].humidity;
        var humidityForecastP=$("<p>").text("Temperature: "+humidityForecast+ "%");
        
        //div dump, Not displaying
        var forecastHolderDiv = $("#forecast-box-holder");
        var DailyDiv = $("<div class='forecast-box'>");
        DailyDiv.append(dateForecastP);
        DailyDiv.append(iconImgForescast);
        forecastHolderDiv.append(DailyDiv);
    };
};

function clearPreviousResponse(){
$("#current-day-box").empty();
}