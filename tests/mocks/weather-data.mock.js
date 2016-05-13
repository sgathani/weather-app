(function() {
  function weatherDataMock() {
    var svc = {};

    svc.getData = function() {
      return {
        cod: 200,
        coord: {},
        sys: {
          sunrise: 1462786830,
          sunset: 1462838396
        },
        weather: [{
          description: 'Sky is Clear'
        }],
        main: {
          temp: 53.33,
          humidity: 34
        },
        dt: 1462759854,
        name: 'Norwalk'
      };
    };

    return svc;
  }

  angular.module('weatherApp.mocks.weatherDataMock', []).factory('weatherDataMock', weatherDataMock);
}());
