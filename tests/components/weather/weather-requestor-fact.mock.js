(function() {
  function weatherRequestor($q) {
    var svc = {};

    svc.getCurrentWeather = $q.when({});
    //TODO SG: Make it return mock weather data

    return svc;
  }

  angular.module('weatherApp.mocks.weatherRequestor', []).factory('weatherRequestor', weatherRequestor);
}());
