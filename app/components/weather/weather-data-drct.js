(function() {
  function weatherDataDrct() {
    return {
      restrict: 'E',
      templateUrl: 'components/weather/weather-data.html',
      controller: 'weatherDataCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      scope: {},
    };
  }

  angular.module('weatherApp').directive('weatherData', weatherDataDrct);
}());
