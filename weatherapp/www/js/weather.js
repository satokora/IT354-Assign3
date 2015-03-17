$("#location").submit(function(){

    var $inputData = $('#search-basic').val();

    $.getJSON('http://api.openweathermap.org/data/2.5/weather', { q : $inputData }, function(data) {

      var $city = data.name + ", " + data.sys.country;
      var $weatherName= data.weather[0].main;
      var $weatherDesc= data.weather[0].description;
      var $temp = parseFloat(data.main.temp) - 273.15;
      var $tempMin = parseFloat(data.main.temp_min) - 273.15;
      var $tempMax = parseFloat(data.main.temp_max) - 273.15;
      var $iconName = getWeatherIcon(data.weather[0].icon);
      var $dataReceivedDate = data.dt;
      var $sunriseDate = data.sys.sunrise;
      var $sunsetDate = data.sys.sunset;


      $("#city-name").text($city);
      $("#weather-name").text($weatherName);
      $("#weather-desc").text($weatherDesc);
      $("#temp").text(parseInt($temp));
      $("#temp").append("<span class='fs2 climacon celcius'></span>");

      $("#temp-min-max").text(parseInt($tempMin));
      $("#temp-min-max").append("<span class='fs2 climacon celcius'></span>");
      $("#temp-min-max").append(" / " + parseInt($tempMax));
      $("#temp-min-max").append("<span class='fs2 climacon celcius'></span>");
      $("#weather-icon span").removeClass();
      $("#weather-icon span").addClass($iconName);
      getBackgroundByUTC($dataReceivedDate, $sunriseDate, $sunsetDate);

    });

    $.getJSON('api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=5', { q : $inputData }, function(data) {

      var $city = data.name + ", " + data.sys.country;
      var $weatherName= data.weather[0].main;
      var $weatherDesc= data.weather[0].description;
      var $temp = parseFloat(data.main.temp) - 273.15;
      var $tempMin = parseFloat(data.main.temp_min) - 273.15;
      var $tempMax = parseFloat(data.main.temp_max) - 273.15;
      var $iconName = getWeatherIcon(data.weather[0].icon);
      var $dataReceivedDate = data.dt;
      var $sunriseDate = data.sys.sunrise;
      var $sunsetDate = data.sys.sunset;


      $("#city-name").text($city);
      $("#weather-name").text($weatherName);
      $("#weather-desc").text($weatherDesc);
      $("#temp").text(parseInt($temp));
      $("#temp").append("<span class='fs2 climacon celcius'></span>");

      $("#temp-min-max").text(parseInt($tempMin));
      $("#temp-min-max").append("<span class='fs2 climacon celcius'></span>");
      $("#temp-min-max").append(" / " + parseInt($tempMax));
      $("#temp-min-max").append("<span class='fs2 climacon celcius'></span>");
      $("#weather-icon span").removeClass();
      $("#weather-icon span").addClass($iconName);
      getBackgroundByUTC($dataReceivedDate, $sunriseDate, $sunsetDate);

    });
    return false;

});

function getWeatherIcon(iconCode){
  var icons = {};
  var result ="";
  //Weathers during daytime
  icons["01d"] = "fs1 climacon sun";
  icons["02d"] = "fs1 climacon cloud sun";
  icons["03d"] = "fs1 climacon cloud";
  icons["04d"] = "fs1 climacon cloud";
  icons["09d"] = "fs1 climacon rain";
  icons["10d"] = "fs1 climacon rain sun";
  icons["11d"] = "fs1 climacon lightning";
  icons["13d"] = "fs1 climacon snow";
  icons["50d"] = "fs1 climacon fog";

  //Weathers during nighttime
  icons["01n"] = "fs1 climacon moon";
  icons["02n"] = "fs1 climacon cloud moon";
  icons["03n"] = "fs1 climacon cloud";
  icons["04n"] = "fs1 climacon cloud";
  icons["09n"] = "fs1 climacon rain";
  icons["10n"] = "fs1 climacon rain moon";
  icons["11n"] = "fs1 climacon lightning";
  icons["13n"] = "fs1 climacon snow";
  icons["50n"] = "fs1 climacon fog";

  $.each(icons, function(key, value) {
      if (key == iconCode){
        result = value;
      }
    });
  return result;
}

function getBackgroundByUTC(utcTime, sunrise, sunset){
  var date = new Date(utcTime * 1000);
  var sunriseDate = new Date(sunrise * 1000);
  var sunsetDate = new Date(sunset * 1000);

  var currentDate = parseInt(date.toUTCString().substr(17,2));
  var sunriseTime = parseInt(sunriseDate.toUTCString().substr(17,2));
  var sunsetTime = parseInt(sunsetDate.toUTCString().substr(17,2));
  // alert(date.toUTCString() + ", " + sunriseDate.toUTCString() + ", " + sunsetDate.toUTCString());

  var diffSunrise = sunriseTime - currentDate;
  var diffSunset = sunsetTime - currentDate;

   alert("Current Date:" + date.toUTCString() + " " + currentDate + "\n Difference From Sunrise:" + sunriseDate.toUTCString() + " " + diffSunrise + "\n Difference From Sunset:" + sunsetDate.toUTCString() + " " + diffSunset );
  // alert(sunriseTime);
  // alert(diffSunrise);
  $("#page-bg").removeClass('bg-day');
  $("#page-bg").removeClass('bg-evening');
  $("#page-bg").removeClass('bg-morning');
  $("#page-bg").removeClass('bg-night');

  // if (diffSunrise > 1 && diffSunset > 2){
  //   $("#page-bg").addClass('bg-night');
  // }else if (diffSunrise <= 1 && diffSunset > 2){
  //   $("#page-bg").addClass('bg-morning');
  // }else if (diffSunrise <= -3 && diffSunset > 2){
  //   $("#page-bg").addClass('bg-day');
  // }else if (diffSunrise <= -3 && diffSunset <= 2){
  //   $("#page-bg").addClass('bg-evening');
  // }else if (diffSunrise <= -3 && diffSunset <= -1){
  //   $("#page-bg").addClass('bg-night');
  // }

  if (diffSunrise <= -3 && diffSunset <= -1){
    $("#page-bg").addClass('bg-night');
  }else if (diffSunrise <= -3 && diffSunset <= 2){
    $("#page-bg").addClass('bg-evening');
  }else if (diffSunrise <= -3 && diffSunset > 2){
    $("#page-bg").addClass('bg-day');
  }else if (diffSunrise <= 1 && diffSunset > 2){
    $("#page-bg").addClass('bg-morning');
  }else if (diffSunrise > 1 && diffSunset > 2){
    $("#page-bg").addClass('bg-night');
  }else{
    $("#page-bg").addClass('bg-night');
  }
}