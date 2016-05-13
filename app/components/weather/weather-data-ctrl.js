(function() {
  function weatherDataCtrl(weatherRequestor, weatherDataValidator) {
    var ctrl = this;
    ctrl.fetchInProgress = false;
    ctrl.showWeatherData = false;

    ctrl.getWeatherData = function(city, state) {
      ctrl.fetchInProgress = true;
      ctrl.showWeatherData = false;

      city = city ? city.trim() : city;
      state = state ? state.trim() : state;

      if (!weatherDataValidator.isValid(city, state)) {
        return;
      }

      return weatherRequestor.getCurrentWeather(city, state)
        .then(weatherFetchSuccess, weatherFetchError)
        .finally(function() {
          ctrl.fetchInProgress = false;
        });
    };

    function weatherFetchSuccess(weatherData) {
      ctrl.weatherData = weatherData;
      ctrl.showWeatherData = true;
    }

    function weatherFetchError(error) {
      if (error.hasOwnProperty('message')) {
        alert(error.message);
      } else {
        alert('There was an error requesting the data.');
      }
    }
  }

  angular.module('weatherApp').controller('weatherDataCtrl', weatherDataCtrl);
}());
