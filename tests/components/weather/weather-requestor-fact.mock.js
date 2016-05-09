(function() {
  function weatherRequestor($q, weatherDataMock) {
    var svc = {};

    svc.getCurrentWeather = $q.when(weatherDataMock.getData());

    return svc;
  }

  angular.module('weatherApp.mocks.weatherRequestor', ['weatherApp.mocks.weatherDataMock']).factory('weatherRequestor', weatherRequestor);
}());
