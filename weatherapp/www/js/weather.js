$(".location").click(function() {
  window.location.href = 'index.html';
  // location.reload();
});
$( document ).ready(function() {
  $( "#search-basic" ).focus();
});

$(".location").submit(function(){

    var $inputData = "q=" + $('#search-basic').val();

    getDailyWeather($inputData);
    getWeeklyWeather($inputData);

    return false;

});
$("#gps").submit(function(){
    var $latlong="";

    var Geo={};

        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(success, error);
        }
        
        function success(position) {
            Geo.lat = position.coords.latitude;
            Geo.lng = position.coords.longitude;
            $latlong = "lat=" + Geo.lat + "&lon=" + Geo.lng;

            getDailyWeather($latlong);
            getWeeklyWeather($latlong);

            return false;
        };

        function error(){
            console.log("Geocoder failed");
            return false;
        };



});
        

function getDailyWeather (inputData) {

    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?&mode=xml&units=imperial&" + inputData,
        dataType: "xml",
        success: function(xml) {
          var $city = $(xml).find('city').attr('name') + ", " + $(xml).find('city').find('country').text();
          var $weatherName= $(xml).find('weather').attr('value');
          
          var $temp = $(xml).find('temperature').attr('value');
          var $tempMin = $(xml).find('temperature').attr('min');
          var $tempMax = $(xml).find('temperature').attr('max');
          var $iconName = getWeatherIcon($(xml).find('weather').attr('icon'));
          
          
          $("#city-name").text($city);
          $("#weather-name").text($weatherName);
          $("#weather-icon").attr("src","img/png/" + $iconName);
          // $("#weather-desc").text($weatherDesc);
          $("#temp").text(parseInt($temp));
          $("#temp").append("&#8457;");

          $("#temp-min-max").text(parseInt($tempMin));
          $("#temp-min-max").append("&#8457;");
          $("#temp-min-max").append(" / " + parseInt($tempMax));
          $("#temp-min-max").append("&#8457;");
          // $("#weather-icon span").removeClass();
          // $("#weather-icon span").addClass($iconName);
          // getBackgroundByUTC($dataReceivedDate, $sunriseDate, $sunsetDate);
          
        },
        error: function(){
          alert("function called but failed");
        }
      });
}

function getWeeklyWeather (inputData) {
      $.ajax({
              type: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast/daily?mode=xml&units=imperial&cnt=5&" + inputData,
        dataType: "xml",
        success: function(xml) {
          var $city = $(xml).find('location').find('name').text() + ", " + $(xml).find('location').find('country').text();

          $("#page-weekly #city-name").text($city);

          // set each day's data
          $(xml).find('time').each(function(){
            var $date = $(this).attr('day');
            var $weatherDesc= $(this).find('symbol').attr('name');
            var $iconName = getWeatherIcon($(this).find('symbol').attr('var'));
            var $temp = $(this).find('temperature').attr('day').substr(0,2);
            var $tempMin = $(this).find('temperature').attr('min').substr(0,2);
            var $tempMax = $(this).find('temperature').attr('max').substr(0,2);


            // weather icon
            $("#weekly-forecast").append('<table align="center"><tr style="text-align:left"><td rowspan=2>' + $date 
              + '</td><td rowspan=2><img src="img/png/'+ $iconName + '"></td><td>'+ $weatherDesc + '</td></tr>'
             + '<tr><td>' + $temp + '&#8457; ('
              + $tempMin + '&#8457; / '
              + $tempMax + '&#8457;)' +'</td></tr></table>');
          });
        }
      });

}

function getWeatherIcon(iconCode){
  var icons = {};
  var result ="";

  //Weathers during daytime
  // icons["01d"] = "fs1 climacon sun";
  // icons["02d"] = "fs1 climacon cloud sun";
  // icons["03d"] = "fs1 climacon cloud";
  // icons["04d"] = "fs1 climacon cloud";
  // icons["09d"] = "fs1 climacon rain";
  // icons["10d"] = "fs1 climacon rain sun";
  // icons["11d"] = "fs1 climacon lightning";
  // icons["13d"] = "fs1 climacon snow";
  // icons["50d"] = "fs1 climacon fog";

  // //Weathers during nighttime
  // icons["01n"] = "fs1 climacon moon";
  // icons["02n"] = "fs1 climacon cloud moon";
  // icons["03n"] = "fs1 climacon cloud";
  // icons["04n"] = "fs1 climacon cloud";
  // icons["09n"] = "fs1 climacon rain";
  // icons["10n"] = "fs1 climacon rain moon";
  // icons["11n"] = "fs1 climacon lightning";
  // icons["13n"] = "fs1 climacon snow";
  // icons["50n"] = "fs1 climacon fog";
  icons["01d"] = "32.png";
  icons["02d"] = "34.png";
  icons["03d"] = "26.png";
  icons["04d"] = "26.png";
  icons["09d"] = "01.png";
  icons["10d"] = "39.png";
  icons["11d"] = "35.png";
  icons["13d"] = "14.png";
  icons["50d"] = "20.png";

  //Weathers during nighttime
  icons["01n"] = "31.png";
  icons["02n"] = "29.png";
  icons["03n"] = "26.png";
  icons["04n"] = "26.png";
  icons["09n"] = "01.png";
  icons["10n"] = "45.png";
  icons["11n"] = "35.png";
  icons["13n"] = "14.png";
  icons["50n"] = "20.png";

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

  var diffSunrise = sunriseTime - currentDate;
  var diffSunset = sunsetTime - currentDate;


  $("#page-day").removeClass('bg-day');
  $("#page-day").removeClass('bg-evening');
  $("#page-day").removeClass('bg-morning');
  $("#page-day").removeClass('bg-night');

  $("#page-weekly").removeClass('bg-day');
  $("#page-weekly").removeClass('bg-evening');
  $("#page-weekly").removeClass('bg-morning');
  $("#page-weekly").removeClass('bg-night');


  if (diffSunrise <= -3 && diffSunset <= -1){
    $("#page-day").addClass('bg-night');
    $("#page-weekly").addClass('bg-night');
  }else if (diffSunrise <= -3 && diffSunset <= 2){
    $("#page-day").addClass('bg-evening');
    $("#page-weekly").addClass('bg-evening');
  }else if (diffSunrise <= -3 && diffSunset > 2){
    $("#page-day").addClass('bg-day');
    $("#page-weekly").addClass('bg-day');
  }else if (diffSunrise <= 1 && diffSunset > 2){
    $("#page-day").addClass('bg-morning');
    $("#page-weekly").addClass('bg-morning');
  }else if (diffSunrise > 1 && diffSunset > 2){
    $("#page-day").addClass('bg-night');
    $("#page-weekly").addClass('bg-night');
  }else{
    $("#page-day").addClass('bg-day');
    $("#page-weekly").addClass('bg-day');
  }
}