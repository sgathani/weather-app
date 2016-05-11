(function() {
  function weatherRequestor($q, weatherDataMock) {
    var svc = {};

    svc.getCurrentWeather = function() {
      return $q.when(weatherDataMock.getData());
    };

    return svc;
  }

  angular.module('weatherApp.mocks.weatherRequestor', ['weatherApp.mocks.weatherDataMock']).factory('weatherRequestor', weatherRequestor);
}());
